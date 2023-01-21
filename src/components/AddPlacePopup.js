import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props
  const [inputs, setInputs] = React.useState({ name: '', description: '' })

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace(inputs)
  }

  function handleChange(e) {
    const input = e.target
    const { name, value } = input
    setInputs({ ...inputs, [name]: value })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Добавить"
      children={
        <>
          <input
            onChange={handleChange}
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
            onChange={handleChange}
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
  )
}

export default AddPlacePopup
