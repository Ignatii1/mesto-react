import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const { isOpen, onClose } = props
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar(avatarRef.current.value)
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="updateAvatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Загрузить"
      children={
        <>
          <input
            ref={avatarRef}
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
  )
}

export default EditAvatarPopup
