import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'
import '../index.css'
import React, { useEffect, useState } from 'react'
import api from '../utils/api'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [userAvatar, setUserAvatar] = useState()
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState()

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((res) => {
        const [profileInfo, cardsArray] = res
        const { name, about, avatar } = profileInfo
        console.log(avatar, name, about)
        setUserAvatar(avatar)
        setUserName(name)
        setUserDescription(about)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddCard={handleAddCardClick}
        onEditAvatar={handleEditAvatarClick}
        avatar={userAvatar}
        name={userName}
        description={userDescription}
      />

      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input
              type="text"
              className="popup__input popup__input-name"
              name="name"
              id="name-input"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__input-error name-input-error"></span>
            <input
              type="text"
              className="popup__input popup__input-description"
              name="description"
              id="description-input"
              placeholder="О себе"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__input-error description-input-error"></span>
          </>
        }
      />
      <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input
              type="text"
              className="popup__input popup__add-name"
              name="name"
              id="title-input"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__input-error title-input-error"></span>
            <input
              type="url"
              className="popup__input popup__add-link"
              name="link"
              id="link-input"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error link-input-error"></span>
          </>
        }
      />

      <PopupWithForm
        title="Обновить аватар"
        name="updateAvatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input
              type="url"
              className="popup__input popup__add-link"
              name="avatar"
              id="avatar-link-input"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error avatar-link-input-error"></span>
          </>
        }
      />

      <div className="popup popup_photo">
        <figure className="popup__content popup__content_photo">
          <button
            className="popup__close-button popup__close-button_photo"
            type="button"
            aria-label="ClosePhoto"
          ></button>
          <img src="#" alt="" className="popup__image" />
          <figcaption className="popup__description"></figcaption>
        </figure>
      </div>

      <div className="popup popup_confirmation">
        <div className="popup__content">
          <button
            className="popup__close-button popup__close-button_add"
            type="button"
            aria-label="CloseAdd"
          ></button>
          <form
            className="form popup__container popup__container_add"
            noValidate
          >
            <h2 className="popup__title popup__title-confirmation">
              Вы уверены?
            </h2>
            <button
              className="popup__submit popup__add-button"
              type="submit"
              aria-label="Submit"
            >
              Да
            </button>
          </form>
        </div>
      </div>
      <template id="item__template">
        <article className="photo-grid__card">
          <img src="#" alt="" className="photo-grid__card-img" />
          <button
            className="photo-grid__delete-btn"
            type="button"
            aria-label="Delete"
          ></button>
          <div className="photo-grid__item-description">
            <h2 className="photo-grid__card-name"></h2>
            <div className="photo-grid__card-likes">
              <button
                className="photo-grid__card-btn"
                type="button"
                aria-label="Like"
              ></button>
              <div className="photo-grid__like-count"></div>
            </div>
          </div>
        </article>
      </template>
    </div>
  )
}

export default App
