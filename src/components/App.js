import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
  }

  return (
    <>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onNewPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />

                <PopupWithForm title="Обновить Аватар" name="avatar" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
                                <section className="popup__section">
                                    <input
                                        className="popup__input popup__input_type_link"
                                        name="link"
                                        type="url"
                                        id="avatar-input"
                                        placeholder="Ссылка на картинку"
                                        required
                                    />
                                    <span className="popup__input-error" id="avatar-input-error"></span>
                                </section>
                </PopupWithForm>

                <PopupWithForm title="Редактировать профиль" name="edit" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
                                <section className="popup__section">
                                    <input
                                        className="popup__input popup__input_type_name"
                                        name="name"
                                        type="text"
                                        id="name-input"
                                        placeholder="Имя"
                                        value="Жак-Ив Кусто"
                                        minlength="2"
                                        maxlength="40"
                                        required
                                    />
                                    <span className="popup__input-error" id="name-input-error"></span>
                                </section>
                                <section className="popup__section">
                                    <input
                                        className="popup__input popup__input_type_about"
                                        name="about"
                                        type="text"
                                        id="about-input"
                                        placeholder="О себе"
                                        value="Исследователь океана"
                                        minlength="2"
                                        maxlength="200"
                                        required
                                    />
                                    <span className="popup__input-error" id="about-input-error"></span>
                                </section>
                </PopupWithForm>

                <PopupWithForm title="Новое Место" name="add" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
                                <section className="popup__section">
                                    <input
                                        className="popup__input popup__input_type_title"
                                        name="title"
                                        type="text"
                                        id="place-input"
                                        placeholder="Название"
                                        minlength="2"
                                        maxlength="30"
                                        required
                                    />
                                    <span className="popup__input-error" id="place-input-error"></span>
                                </section>
                                <section className="popup__section">
                                    <input
                                        className="popup__input popup__input_type_link"
                                        name="link"
                                        type="url"
                                        id="link-input"
                                        placeholder="Ссылка на картинку"
                                        required
                                    />
                                    <span className="popup__input-error" id="link-input-error"></span>
                                </section>
                </PopupWithForm>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

                <PopupWithForm title="Вы уверены?" name="confirm" onClose={closeAllPopups}>
                </PopupWithForm>
      </>
  );
}

export default App;
