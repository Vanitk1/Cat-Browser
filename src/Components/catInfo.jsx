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
      <div className="cat-description">
      <h2 className="loo">{breed.name}</h2>
      <div className="ghd-container">
      <p className="ghd">{breed.description}</p>
      </div>
      <p className="temp">
        <strong>Temperament:</strong> {breed.temperament}
      </p>
      <p className="origin">
        <strong>Origin:</strong> {breed.origin} | <strong>Life span:</strong>{' '}
        {breed.life_span} years
      </p>
      </div>
    </div>
  )
}

export default CatInformation