import { useEffect, useState } from 'react'
import './App.css'
import CatInformation from './Components/catInfo'

const API_KEY = 'live_N0xF7a5yzLeMcFozJMX10WsduTHZuuyHfxFuVcdik2krNnau5ajy6YsI4moUPCVE'

function App() {
  const [breeds, setBreeds] = useState([])
  const [selectBreeds, setSelectBreeds] = useState([])
  const [selectColour, setSelectColour] = useState([])
  const [breedInformation, setBreedInformation] = useState(null)

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds', {
      headers: { 'x-api-key': API_KEY },
    })
      .then(response => response.json())
      .then(data => setBreeds(data))
  }, [])

  async function submitButton(e) {
    e.preventDefault()
    if (!selectBreeds) {
      return
    }

    const breed = breeds.find(b => b.id === selectBreeds)
    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=6&breed_ids=${selectBreeds}`,
      { headers: { 'x-api-key': API_KEY } }
    )
    const images = await res.json()

    setBreedInformation({ breed, images })
  }

  return (
    <div className="app">
      <h1>Cat Browser 🐱</h1>
      <form onSubmit={submitButton}>
        <label>
          Select breed:
          <select
            value={selectBreeds}
            onChange={e => setSelectBreeds(e.target.value)}
          >
            <option value="">-- Choose a breed --</option>
            {breeds.map(b => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by colour:
          <input
            type="text"
            placeholder="e.g., white, black"
            value={selectColour}
            onChange={e => setSelectColour(e.target.value.toLowerCase())}
          />
        </label>
        <button type="submit">View Breed</button>
      </form>

      {breedInformation && (
        <CatInformation
          breed={breedInformation.breed}
          images={breedInformation.images}
          colour={selectColour}
        />
      )}
    </div>
  )
}

export default App