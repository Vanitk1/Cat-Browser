import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import catInformation from "./catInfo"

const API_KEY="live_N0xF7a5yzLeMcFozJMX10WsduTHZuuyHfxFuVcdik2krNnau5ajy6YsI4moUPCVE"

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectBreeds, setSelectBreeds] = useState([]);
  const [selectColour, setSelectColourS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breedInformation, setBreedInformation] = useState([]);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds", { headers: { 'x-api-key': API_KEY }})
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      setSelectBreeds(body.results)
    }, [])
  })

 async function submitButton(e) {
  e.preventDefault()
  if (!selectBreeds) {
    return null
  }

  const breed = breeds.find(a => a.id === selectBreeds)
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=6&breed_ids=${selectBreeds}`
  )

   const images = await response.json()

    setBreedInformation({ breed, images })
 }

  return (
    <>
      <div className = "app">
        <h1>Cats</h1>
        <form onSubmit={submitButton}>
          <label>

          </label>
        </form>
      </div>
    </>
  )
}

export default App
