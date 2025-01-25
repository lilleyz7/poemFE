import Navbar from "@/components/NavBar"
import PoemCard from "@/components/PoemCard";
import SearchBar from "@/components/SearchBar"
import { Button } from "@/components/ui/button";
import { CheckAuth } from "@/lib/checkUser";
import { ByTitleRequest, RandomRequest } from "@/lib/poemRequest";
import { Poem } from "@/types/Poem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SearchPage: React.FC = () => {
    const [activePoem, setActivePoem] = useState<Poem>();
    const [isSearching, setIsSearching] = useState(false)

    const navigate = useNavigate();
    
    useEffect(() => {
      async function checkLogged(){
      const isLoggedIn = await CheckAuth()
        if (!isLoggedIn){
          navigate("/")
        }}
        checkLogged()
    }, [navigate])

    const handleSearch = async (query: string) => {
        console.log("Searching for:", query);
        setIsSearching(true)
        try{
            const poem: Poem = await ByTitleRequest(query)
            setActivePoem(poem)
            setIsSearching(false)
        } catch(e){
            setIsSearching(false)
            alert(e)
        }
        setIsSearching(false);
      };

    const randomSearch = async () => {
        setIsSearching(true)
        try{
            const poem = await RandomRequest()
            setActivePoem(poem)
            setIsSearching(false)
        } catch(e){
            setIsSearching(false)
            alert(e)
        }
        setIsSearching(false)
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Search Poems</h1>
            <Navbar/>
            <Button onClick={randomSearch}>Random Poem</Button>
            <SearchBar onSearch={handleSearch} placeholder="Find a poem by title or author..."/>
            { isSearching && (
                <p>Searching...</p>
            )}

            {activePoem && (
                <PoemCard poem={activePoem}/>
            )}
        </div>
    )
} 

export default SearchPage