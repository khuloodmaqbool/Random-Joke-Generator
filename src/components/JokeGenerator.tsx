"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";


export default function JokeGenerator() {

  const [apiData, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlejokeGenerator = async () => {
    setLoading(true);
    setError(null);
    try {
      const api = `https://icanhazdadjoke.com/`
      const res = await fetch(api, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setData(data.joke);

    } catch (error: any) {
      setLoading(false)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handlejokeGenerator()
  }, [])

  return (
    <>

      <div className="max-w-96 shadow rounded-lg mx-auto mt-8 p-5 bg-white">
        <h1 className="font-bold mb-1 text-xl">&#128514; Random Joke Generator &#128514;</h1>

        {loading ? <p>....loading</p> : error ? <p>error</p> : <p className="my-4" >{apiData}</p>}
        <Button variant="outline" className="bg-green_col text-white" onClick={handlejokeGenerator} >{loading ? "...loading" : "Get New Joke"} &#128514;</Button>
      </div>

    </>
  );
}
