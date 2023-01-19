import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const { card, handleCardClick, handleCardLike, handleDeleteClick } = props
  const { name, link, likes } = card
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((i) => i._id === currentUser._id)
  const cardLikeButtonClassName = `photo-grid__card-btn ${
    isLiked && 'photo-grid__card-btn_liked'
  }`

  function handleClick() {
    handleCardClick(card)
  }

  function onCardLike() {
    handleCardLike(card)
  }

  function onCardDelete() {
    handleDeleteClick(card)
  }

  return (
    <article className="photo-grid__card">
      <img
        src={link}
        alt={name}
        className="photo-grid__card-img"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="photo-grid__delete-btn"
          type="button"
          aria-label="Delete"
          onClick={onCardDelete}
        />
      )}
      <div className="photo-grid__item-description">
        <h2 className="photo-grid__card-name">{name}</h2>
        <div className="photo-grid__card-likes">
          <button
            className={cardLikeButtonClassName}
            onClick={onCardLike}
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
