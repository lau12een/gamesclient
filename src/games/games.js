import React from 'react';
import './games.css';
import moment from 'moment';

export default function Games(props) {
  return (
    <div className="game">
      <h2>{ props.App }</h2>
      <div className="game_genre">by { props.Genres }</div>
      <div className="game_rating"> 
       Rating: { props.Rating } 
      </div> 
    </div>
  );
}