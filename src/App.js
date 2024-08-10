// import logo from './logo.svg';
// import './App.css';
// // import Items from './components/Items';
// import { useState } from 'react';
// import {Header} from './components/Header/';
// // import CardAdd from './components/CardAdd';
// import Card from './components/card';
// // import Cards from './Cards';

// function App() {

//   return (
//     <>
//       {/* <Items /> */}
//       <Header />
//       {/* <CardAdd /> */}
//       <Card />
//       {/* <Cards /> */}
//     </>
//   );
// }

// export default App;


import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cards from './components/Cards/Cards';

function App() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
      const storedData = localStorage.getItem('cardsData');
      if (storedData) {
          setCardsData(JSON.parse(storedData));
      }
  }, []);

  const addCard = (newCard) => {
      const updatedCards = [newCard, ...cardsData];
      setCardsData(updatedCards);
      localStorage.setItem('cardsData', JSON.stringify(updatedCards));
  };

  const updateCardStatus = (updatedCard) => {
      const updatedCards = cardsData.map(card =>
          card.id === updatedCard.id ? updatedCard : card
      );
      setCardsData(updatedCards);
      localStorage.setItem('cardsData', JSON.stringify(updatedCards));
  };

  const deleteCard = (cardId) => {
    const updatedCards = cardsData.filter(card => card.id !== cardId);
    setCardsData(updatedCards);
    localStorage.setItem('cardsData', JSON.stringify(updatedCards));
  };

  return (
      <>
          <Header onAddCard={addCard} />
          <div className="main-content">
              <Cards cardsData={cardsData} onCardStatusChange={updateCardStatus} onCardDelete={deleteCard} />
          </div>
          <Footer />
      </>
  );
}

export default App;
