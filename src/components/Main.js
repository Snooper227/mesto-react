import React from 'react';
import BigKrest from '../images/krest.svg';
import {api} from '../utils/Api';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onNewPlace, onCardClick}) {
  const [userName, setUserName] = React.useState('#');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [userDescription, setUserDescription] = React.useState('#');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setCards(cards)
      })
      .catch((err) => console.log(err))
  })

  return(
    <main className="content">
      <section className="profile">
                        <div className="profile__container">
                            <button className="profile__avatar-edit-button" onClick={onEditAvatar} type='button' >
                              <img className="profile__avatar" src={userAvatar} />
                            </button>
                            <div className="profile__info">
                                <h1 className="profile__title">{userName}</h1>
                                <button
                                    className="profile__popup-open"
                                    onClick={onEditProfile}
                                    type="button"
                                ></button>
                                <p className="profile__subtitle">{userDescription}</p>
                            </div>
                        </div>
                        <button className="profile__add-button" onClick={onNewPlace} type="button">
                            <img
                                className="profile__close"
                                src={BigKrest}
                                alt="крестик"
                            />
                        </button>
                    </section>

                    <section className="elements">
                      {cards.map((card) => (
                        <Card key = {card._id} card = {card} onCardClick={onCardClick} />
                        ))}
                    </section>
    </main>
  )

}

export default Main
