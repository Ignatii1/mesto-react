import React, { useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const { isOpen, onClose } = props
  const [inputs, setInputs] = useState({ name: '', description: '' })
  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    setInputs({ name: currentUser.name, description: currentUser.about })
  }, [currentUser])

  function handleChange(e) {
    const input = e.target
    const { name, value } = input
    setInputs({ ...inputs, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name: inputs.name,
      description: inputs.description,
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      children={
        <>
          <input
            onChange={handleChange}
            value={inputs.name}
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
            onChange={handleChange}
            value={inputs.description}
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
  )
}

export default EditProfilePopup
