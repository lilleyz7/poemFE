import Navbar from "@/components/NavBar"
import SearchBar from "@/components/SearchBar"
import { Button } from "@/components/ui/button";
import { RandomRequest } from "@/lib/poemRequest";
import { Poem } from "@/types/Poem";
import { useState } from "react";

const SearchPage: React.FC = () => {
    const [activePoems, setActivePoems] = useState<Poem[]>();
    const [isSearching, setIsSearching] = useState(false)
    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
        // Add your search logic here
      };

    const randomSearch = async () => {
        setIsSearching(true)
        try{
            const poems = await RandomRequest()
            setActivePoems(poems)
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

            {activePoems && activePoems.map((poem) => (
                    <li key={poem.title}>{poem.title}</li>
                ))}
        </div>
    )
} 

export default SearchPage