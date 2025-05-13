import React from "react"

function CatInformation({ breed, images, colour }) {
    const filteredImages = images.filter(image =>
    !colour || image.url.toLowerCase().includes(colour)
  )

    return (
    <div className="cat-info">
            <div className="image-grid">
        {filteredImages.length ? (
          filteredImages.map((image, idx) => (
            <img key={idx} src={image.url} alt={breed.name} height={200} width={200}limit={6}/>
          ))
        ) : (
          <p>No matching images for that colour.</p>
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