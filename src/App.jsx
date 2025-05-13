import { useEffect, useState } from 'react'
import './App.css'
import CatInformation from './Components/catInfo'

const API_KEY = 'live_N0xF7a5yzLeMcFozJMX10WsduTHZuuyHfxFuVcdik2krNnau5ajy6YsI4moUPCVE'

function App() {
  const [breeds, setBreeds] = useState([])
  const [selectBreeds, setSelectBreeds] = useState([])
  const [selectTemperament, setSelectTemperament] = useState([])
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

  let breed = null

  if (selectBreeds) {
    breed = breeds.find(b => b.id === selectBreeds)
    if (selectTemperament && !breed.temperament.toLowerCase().includes(selectTemperament)) {
      setBreedInformation(null)
      return
    }
  } else if (selectTemperament) {
    breed = breeds.find(b =>
      b.temperament.toLowerCase().includes(selectTemperament)
    )
  }

  if (!breed) {
    setBreedInformation(null)
    return
  }

  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=6&breed_ids=${breed.id}`,
    { headers: { 'x-api-key': API_KEY } }
  )
  const images = await res.json()

  setBreedInformation({ breed, images })
}

const allTemperaments = Array.from(
  new Set(breeds.flatMap(b => b.temperament?.split(', ') || []))
).sort()

  return (
    <div className="app">
      <h1>Cat Browser</h1>
      <p>Can either filter by breed or temperament</p>
      <form onSubmit={submitButton}>
        <label>
          Select breed:
          <select
            value={selectBreeds}
            onChange={e => setSelectBreeds(e.target.value)}
          >
            <option value=""> -- Choose a breed -- </option>
            {breeds.map(b => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by Temperament:
          <select
          value={selectTemperament}
          onChange={e => setSelectTemperament(e.target.value.toLowerCase())}
          >
            <option value="">-- Any temperament --</option>
            {allTemperaments.map(temp => (
              <option key={temp} value={temp.toLowerCase()}>
                {temp}
                </option>
              ))}
              </select>
          </label>
          <button type="submit">View Breed</button>
      </form>

      {breedInformation && (
        <CatInformation
          breed={breedInformation.breed}
          images={breedInformation.images}
          temperament={selectTemperament}
        />
      )}
    </div>
  )
}

export default App