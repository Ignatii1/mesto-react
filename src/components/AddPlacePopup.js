import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props
  const [inputs, setInputs] = React.useState({ name: '', link: '' })

  React.useEffect(() => {
    setInputs({ name: '', link: '' })
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace(inputs)
    setInputs({ name: '', link: '' })
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
    >
      <input
        onChange={handleChange}
        value={inputs.name}
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
        value={inputs.link}
        type="url"
        className="popup__input popup__add-link"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
