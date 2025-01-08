import { Poem } from "@/types/Poem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import Cookies from "js-cookie";
import { SavePoem } from "@/lib/poemRequest";

interface PoemCardProps {
    poem: Poem;
  }

  const PoemCard: React.FC<PoemCardProps> = ({ poem }) => {
    const [userToken, setUserToken] = useState<string>("");
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const token = Cookies.get("access")
    if (token){
      setUserToken(token)
    }

    const savePoem = async () => {
      const success = await SavePoem(poem, userToken)
      if (success){
        setIsSaved(!isSaved)
        alert("Poem Saved")
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
            <h1>{poem.title}</h1>
            <h2>{poem.author}</h2>
            {poem.lines.map((line, index) => (
              <div>
              <p key={index} className="leading-relaxed">
                {line}
              </p>
              {isSaved && (
                <button >Saved</button>
              )}

              {!isSaved && (
              <button onClick={savePoem}>Save</button>
              )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

export default PoemCard