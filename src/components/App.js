import React from 'react';
import Header from './Header';
import Main from './Main';
import {api} from '../utils/Api';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDeletePopup from './ConfirmCardDeletePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isConfirmCardDeletePopupOpen, setConfirmCardDeletePopupOpen] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, []);

  function openConfirmCardDeletePopup(card) {
    setConfirmCardDeletePopupOpen(true);
    setDeletedCard(card._id);
  };

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
    setConfirmCardDeletePopupOpen(false)
    setSelectedCard(null);
    setDeletedCard(null);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleUpdateUser(data) {
      api.changeUserInfo(data)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopups();
        })
          .catch((err) => {
            console.log(err)
          })
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmite(data) {
    api.addCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => console.log(err))
  }


  function handleCardDelete(deletedCard) {
    api.deleteCard(deletedCard)
      .then(() => {
        setCards(state => state.filter(c => c._id !== deletedCard));
        closeAllPopups();
      })
        .catch((err) => console.log(err))
  }

  return (
    <>
        <CurrentUserContext.Provider value={currentUser}>
          <Header />

            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onNewPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onConfirmCardDelete={openConfirmCardDeletePopup}
            />

          <Footer />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmite} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <ConfirmCardDeletePopup onClose={closeAllPopups} isOpen={isConfirmCardDeletePopupOpen} cardId={deletedCard} onCardDelete={handleCardDelete}/>
        </CurrentUserContext.Provider>
      </>
  );
}

export default App;
