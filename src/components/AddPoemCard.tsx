import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { CheckAuth } from "@/lib/checkUser"; 

export const AddPoemForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [lines, setLines] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
      async function getAuthStatus(){
        const auth  = await CheckAuth()
        if (!auth){
          navigate("/login")
        }
      }
      getAuthStatus().then()
    }, [navigate])
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      const concatLines = lines.split("\n")
  
      const poemData = {
        title,
        author,
        lines: concatLines,
        linecount: concatLines.length.toString()
      };

      const authToken = Cookies.get("access")
      const url = import.meta.env.VITE_BASE_API_URL
      const finalUrl = url + "addPoem"

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(poemData),
      } 
  
      try {
        const response = await fetch(finalUrl, options);
  
        if (!response.ok) {
          const errorMessage = await response.text();
          setError(`Failed to add poem: ${errorMessage}`);
          return;
        }
  
        setSuccess("Poem added successfully!");
        setTitle("");
        setAuthor("");
        setLines("");
      } catch (err) {
        setError(`An error occurred: ${err}`);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-6 shadow-md rounded-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Add Your Poem</h1>
  
        <div className="mb-4">
          <Input
            placeholder="Poem Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <Textarea
            placeholder="Write your poem here... (one line per line)"
            value={lines}
            onChange={(e) => setLines(e.target.value)}
            rows={8}
            required
          />
        </div>
  
        <div className="flex justify-end space-x-4">
          <Button type="submit" variant="default">
            Submit Poem
          </Button>
        </div>
  
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    );
  };