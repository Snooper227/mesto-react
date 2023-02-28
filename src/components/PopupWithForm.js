import React from 'react'

function PopupWithForm({isOpen, name, onClose, title, children}) {
  return(
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"></button>
          <form className={`popup__form popup__form_${name}`} name={`${name}-form`} novalidate>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className={`popup__button popup__button_type_${name}`} type="submit">
              Создать
            </button>
          </form>
    </div>
   </div>
  )
}
export default PopupWithForm
