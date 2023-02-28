import React from 'react';

function Card({card, onCardClick}) {
  function handleClickPlace() {
    onCardClick(card)
  }

  return(
    <div className="element">
      <button className="element__basket" type="button"></button>
      <img className="element__photo element__photo_type_popup" onClick={handleClickPlace} src={card.link} alt={card.name} />
      <div className="element__discription">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-box">
          <button className="element__like" type="button"></button>
          <p className="element__like-counter">{card.likes.lenght}</p>
        </div>
      </div>
    </div>
  )
}
export default Card
