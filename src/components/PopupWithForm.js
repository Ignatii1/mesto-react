import React from 'react'

function PopupWithForm(props) {
  const { title, name, children, isOpen, onClose, buttonText } = props

  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <button
          className={`popup__close-button popup__close-button_${name}`}
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <form className="form popup__container" name={name} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__submit popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
