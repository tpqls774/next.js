'use client'

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!city) {
      setError("도시를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      if (response.ok) {
        console.log('ok')
        router.push(`/weather/${encodeURIComponent(city)}`);
      }
      if (!response.ok) {
        throw new Error("존재하지 않는 도시입니다.");
      }
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="lo">Enter location</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="lo"
        />
        <button type="submit">search</button>

        {error && <p style={{color:'red'}}><b>{error}</b></p>}

      </form>
    </div>
  )
}
