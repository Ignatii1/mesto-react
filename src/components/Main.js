import React from 'react'

function Main(props) {
  const { onEditProfile, onAddCard, onEditAvatar, avatar, name, description } =
    props

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={`${avatar}`}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__name-container">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Edit"
            onClick={onEditProfile}
          ></button>
        </div>
        <p className="profile__description">{description}</p>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Add"
          onClick={onAddCard}
        ></button>
      </section>

      <section className="photo-grid"></section>
    </main>
  )
}

export default Main
