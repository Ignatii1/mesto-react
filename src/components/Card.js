import React from 'react'

function Card(props) {
  const { card, handleCardClick } = props
  const { name, link, likes } = card
  function handleClick() {
    handleCardClick(card)
  }

  return (
    <article className="photo-grid__card">
      <img
        src={link}
        alt={name}
        className="photo-grid__card-img"
        onClick={handleClick}
      />
      <button
        className="photo-grid__delete-btn"
        type="button"
        aria-label="Delete"
      ></button>
      <div className="photo-grid__item-description">
        <h2 className="photo-grid__card-name">{name}</h2>
        <div className="photo-grid__card-likes">
          <button
            className="photo-grid__card-btn"
            type="button"
            aria-label="Like"
          ></button>
          <div className="photo-grid__like-count">{likes.length}</div>
        </div>
      </div>
    </article>
  )
}

export default Card
