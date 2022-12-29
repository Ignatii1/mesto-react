import React from 'react'

function ImagePopup(props) {
  const { card, isOpen, onClose } = props

  return (
    <div className={`popup popup_photo ${isOpen && 'popup_opened'}`}>
      <figure className="popup__content popup__content_photo">
        <button
          className="popup__close-button popup__close-button_photo"
          type="button"
          aria-label="ClosePhoto"
          onClick={onClose}
        ></button>
        <img src={card.link} alt="" className="popup__image" />
        <figcaption className="popup__description"></figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
