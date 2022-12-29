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
  const [userAvatar, setUserAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((res) => {
        const [profileInfo, cardsArray] = res
        const { name, about, avatar } = profileInfo
        setCards(cardsArray)
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

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
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
        cards={cards}
        handleCardClick={handleCardClick}
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

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={Object.keys(selectedCard).length !== 0}
      />
    </div>
  )
}

export default App
