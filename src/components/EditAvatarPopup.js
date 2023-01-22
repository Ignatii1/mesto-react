import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const { isOpen, onClose } = props
  const avatarRef = React.useRef()
  const [avatarLink, setAvatarLink] = useState('')

  useEffect(() => {
    setAvatarLink('')
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar(avatarLink)
  }

  function handleChange(e) {
    setAvatarLink(e.target.value)
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="updateAvatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Загрузить"
    >
      <input
        ref={avatarRef}
        value={avatarLink}
        onChange={handleChange}
        type="url"
        className="popup__input popup__add-link"
        name="avatar"
        id="avatar-link-input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
