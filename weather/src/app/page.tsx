'use client'

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Home() {
  const [city, setCity] = useState<string>("")
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(city.trim()){
      router.push(`/weather/${encodeURIComponent(city)}`)
    }
  };

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
      </form>
    </div>
  )
}
