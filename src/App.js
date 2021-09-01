import React, { useState } from "react";
import Images from "./Images";
import { shuffle } from 'lodash'

function App() {

  // Random array with shuffle
  const [cards, setCards] = useState(shuffle([...Images, ...Images]))
  const [activeCards, setActiveCards] = useState([])
  const [foundPairs, setFoundPairs] = useState([])
  const [win, setWin] = useState(false)
  const [count, setCount] = useState(0)

  // Handle click slipped items
  function slipped(index) {

    // Check user win game
    if (win) {
      setCards(shuffle([...Images, ...Images]))
      setFoundPairs([])
      setWin(false)
      setCount(0)
    }
    if (activeCards.length === 0) setActiveCards([index])
    if (activeCards.length === 2) setActiveCards([index])

    if (activeCards.length === 1) {
      const firstIndex = activeCards[0]
      const secondIndex = index
      // Check if match then push into foundPairs
      cards[firstIndex] === cards[secondIndex]
        ? setFoundPairs([...foundPairs, firstIndex, secondIndex])
        :
        setActiveCards([...activeCards, index])
      
      // Check win game
      if (foundPairs.length + 2 === cards.length) {
        setWin(true)
      }
      setCount(count + 1)
    }
  }



  return (
    <>
      <div className="board">
        {cards.map((card, index) => {
          const flippedFromFront = activeCards.indexOf(index) !== -1 || foundPairs.indexOf(index)
          return (
            <div className={"cart-outer" +
              (flippedFromFront !== -1 ? ' flipped' : '')}  // return -1 if not found
              onClick={() => slipped(index)}
            >
              <div className="card">
                <div className="front">
                  <img src={card} />
                </div>
                <div className="back"></div>
              </div>
            </div>
          )
        })}
        {/* Count */}
      </div>
      <div className='detail-count'>
        <p>Click: &nbsp;{count}</p>
        <p>Found pair: {foundPairs.length / 2} / {cards.length / 2}</p>
      </div>
        {!win && (
          <>
          <h2>you win , Congratulations !</h2>
          <div class="pyro"><div class="before"></div><div class="after"></div></div>
          </>
        )}
    </>
  );
}

export default App;
