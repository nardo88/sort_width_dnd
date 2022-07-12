import { useState } from 'react';
import './App.css';

function App() {

  const [cards, setCards] = useState([
    {id: 1, order: 3, text: 'КАРТОЧКА 3'},
    {id: 2, order: 1, text: 'КАРТОЧКА 1'},
    {id: 3, order: 2, text: 'КАРТОЧКА 2'},
    {id: 4, order: 4, text: 'КАРТОЧКА 4'},
  ])
  const [currentCard, setCurrentCard] = useState(null)

  const dragStart = (e, card) => {
    setCurrentCard(card)
  }
  const dragEnd = (e) => {
    e.target.style.background = 'transparent'

  }
  const dragOver = (e) => {
    e.preventDefault()
    e.target.style.background = 'lightgray'

  }
  const drop = (e, card) => {
    e.preventDefault()

    setCards(cards.map(c => {
      if(c.id === card.id){
        return {...c, order: currentCard.order}
      }
      if(c.id === currentCard.id){
        return {...c, order: card.order}
      }

      return c
    }))
    e.target.style.background = 'white'

  }

  const sortCards = (a, b) => a.order > b.order ? 1 : -1
  return (
    <div className="app">
      {
        cards.sort(sortCards).map(item => 
          <div 
            onDragStart={(e)=> dragStart(e, item)}
            onDragLeave={(e)=> dragEnd(e)}
            onDragEnd={(e)=> dragEnd(e)}
            onDragOver={(e)=> dragOver(e)}
            onDrop={(e)=> drop(e, item)}
            draggable="true" 
            className='card' 
            key={item.id}
          >
            {item.text}
          </div>)
      }
    </div>
  );
}

export default App;
