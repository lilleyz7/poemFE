import Navbar from "@/components/NavBar"
import PoemCard from "@/components/PoemCard";
import SearchBar from "@/components/SearchBar"
import { Button } from "@/components/ui/button";
import { ByTitleRequest, RandomRequest } from "@/lib/poemRequest";
import { Poem } from "@/types/Poem";
import { useState } from "react";

const SearchPage: React.FC = () => {
    const [activePoem, setActivePoem] = useState<Poem>();
    const [isSearching, setIsSearching] = useState(false)

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
      };

    const randomSearch = async () => {
        setIsSearching(true)
        try{
            const poem = await RandomRequest()
            console.log(poem)
            setActivePoem(poem)
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
            <Button onClick={randomSearch}></Button>
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