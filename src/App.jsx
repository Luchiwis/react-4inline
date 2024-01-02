import './App.css'
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { WinnerModal } from './components/WinnerModal';
import { rows, cols, players, colors } from './constants'
import { checkWinner } from './logic/utils'
import { Position } from './components/Position';

function App() {
  // states
  const [player, setPlayer] = useState(players.X)
  const [positions, setPositions] = useState(Array(rows * cols).fill(null))
  const [winner, setWinner] = useState(null)

  //functions
  const pressPosition = (row, col) => {
    update(row, col, player, setPlayer)
  }

  const update = (row, col, player, setPlayer) => {
    const newPositions = [...positions]
    if (winner) { return }
    var validMove = false
    // update position
    const position = newPositions[row * cols + col]
    const colArray = newPositions.filter((_, i) => i % cols === col)
    for (let i = colArray.length - 1; i >= 0; i--) {
      if (colArray[i] === null) {
        newPositions[i * cols + col] = player
        validMove = true
        break
      }
    }
    // check if win
    if (checkWinner(player, newPositions)) {
      // modal
      setWinner(player)
    }
    // update state
    setPositions(newPositions)
  
    // change player turn
    validMove && setPlayer(player === players.X ? players.O : players.X)
  }
  
  const reset = () => {
    setPositions(Array(rows * cols).fill(null))
    setWinner(null)
  }

  return (
    <>
      <div className='mx-auto col-md-9 col-sm-12 text-center'>
        <h1>4 in line</h1>
        <div className='position-container' style={{ 'gridTemplateColumns': `repeat(${cols}, 1fr)` }}>
          {positions.map((state, i) =>
            <Position
              key={i}
              children={positions[i]}
              row={Math.floor(i / cols)}
              col={i % rows}
              command={pressPosition}
              color = { colors[positions[i]] }
            />)
          }
        </div>
        <h3>Turn : {player}</h3>
      </div>
      <WinnerModal winner={winner} commandClose={reset}>aasd</WinnerModal>
    </>
  )
}

export default App
