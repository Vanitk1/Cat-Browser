import React from "react"

function CatInformation({ breed, images }) {

    return (
    <div className="cat-info">
            <div className="image-grid">
        {images.length ? (
          images.map((image, index) => (
            <img key={index} src={image.url} alt={breed.name} height={200} width={200}/>
          ))
        ) : (
          <p>No matching images for that temperament.</p>
        )}
      </div>
      <h2>{breed.name}</h2>
      <p>{breed.description}</p>
      <p>
        <strong>Temperament:</strong> {breed.temperament}
      </p>
      <p>
        <strong>Origin:</strong> {breed.origin} | <strong>Life span:</strong>{' '}
        {breed.life_span} years
      </p>
    </div>
  )
}

export default CatInformation