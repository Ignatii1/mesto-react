import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import '../index.css'
import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CurrentCardsContext } from '../contexts/CurrentCardsContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

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
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  function handleUpdateUser(newUserInfo) {
    api
      .updateProfile(newUserInfo)
      .then((res) => setCurrentUser(res))
      .catch((e) => console.log(e))
      .finally(() => closeAllPopups())
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateAvatar(avatarLink)
      .then((res) => setCurrentUser(res))
      .catch((e) => console.log(e))
      .finally(() => closeAllPopups())
  }

  function handleAddPlaceSubmit(cardData) {
    console.log(cardData)
    api
      .postCard(cardData)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((e) => console.log(e))
      .finally(() => closeAllPopups())
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
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
