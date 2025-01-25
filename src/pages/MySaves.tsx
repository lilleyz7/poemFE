import { CheckAuth } from "@/lib/checkUser";
import { Poem } from "@/types/Poem";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { GetSaves } from "@/lib/poemRequest";
import PoemCard from "@/components/PoemCard";

export const MySaves: React.FC = () => {
    const bufferArray:Poem[] = [] 
    const [poemList, setPoemList] = useState<Poem[]>(bufferArray);

    const navigator = useNavigate();

    useEffect(() => {
        async function authenticated(){
            const isLogged = await CheckAuth();
            if(!isLogged){
                navigator("/login")
            }
        }
        async function getPoems(){
            try{
                const poems = await GetSaves();
                setPoemList(poems)
            } catch(e){
                alert(e)
            }
        }
        authenticated();
        getPoems();
    }, [navigator])

    return(
        <div>
            {poemList.map(p => {
                return(<PoemCard poem={p}/>)
            })
            }
        </div>
    )

}