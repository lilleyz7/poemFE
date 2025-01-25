import { Poem } from "@/types/Poem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SavePoem } from "@/lib/poemRequest";

interface PoemCardProps {
    poem: Poem;
  }

  const PoemCard: React.FC<PoemCardProps> = ({ poem }) => {
    const [userToken, setUserToken] = useState<string>("");
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
      function getCookie(){
        const token = Cookies.get("access")
        if (token){
        setUserToken(token)
        }
      }
      getCookie()
    },[])

    const savePoem = async () => {
      try{
        const success = await SavePoem(poem)
        if (success){
          setIsSaved(!isSaved)
          setSuccess("Poem Successfully Saved")
          alert("saved")
        }
      } catch(e){
        setError(e+"")
      }
    }
    return (
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>{poem.title}</CardTitle>
          <CardDescription>by {poem.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-gray-700">
            {poem.lines.map((line, index) => (
              <div>
              <p key={index} className="leading-relaxed">
                {line}
              </p>
              </div>
            ))}
          </div>
        </CardContent>
          {userToken && (
              <button onClick={savePoem}>Save</button>
            )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </Card>
    );
  };

export default PoemCard