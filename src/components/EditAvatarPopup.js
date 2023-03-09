import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = React.useState('')

  React.useEffect(() => {
    if (isOpen) {
      setAvatar('');
    };
  }, [isOpen]);

  function handleChangeAvatar(evt) {
    const text = evt.target.value;
    setAvatar(text);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar
    });
  }

  return (
    <PopupWithForm title="Обновить Аватар" name="avatar" onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit} buttonText='Сохранить'>
                                <section className="popup__section">
                                    <input
                                        className="popup__input popup__input_type_link"
                                        name="link"
                                        type="url"
                                        id="avatar-input"
                                        placeholder="Ссылка на картинку"
                                        value={avatar}
                                        onChange={handleChangeAvatar}
                                        required
                                    />
                                    <span className="popup__input-error" id="avatar-input-error"></span>
                                </section>
                </PopupWithForm>
  )
}
export default EditAvatarPopup
