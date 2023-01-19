import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import '../index.css'
import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CurrentCardsContext } from '../contexts/CurrentCardsContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((res) => {
        const [profileInfo, cardsArray] = res
        setCards(cardsArray)
        setCurrentUser(profileInfo)
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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    })
  }

  function handleDeleteClick(card) {
    console.log(card._id)
    api.deleteCard(card._id).then(() => {
      console.log()
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <CurrentCardsContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleDeleteClick={handleDeleteClick}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <PopupWithForm
            title="Новое место"
            name="add"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            buttonText="Добавить"
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
            buttonText="Загрузить"
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
      </CurrentUserContext.Provider>
    </CurrentCardsContext.Provider>
  )
}

export default App
