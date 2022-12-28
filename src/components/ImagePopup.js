import React from 'react'

function ImagePopup() {
  return (
    <div className="popup popup_photo">
      <figure className="popup__content popup__content_photo">
        <button
          className="popup__close-button popup__close-button_photo"
          type="button"
          aria-label="ClosePhoto"
        ></button>
        <img src="#" alt="" className="popup__image" />
        <figcaption className="popup__description"></figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
