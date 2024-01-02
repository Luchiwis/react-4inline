import './App.css'
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const rows = 6;
const cols = 6;
const players = {
  X: "X",
  O: "O"
}

function WinnerModal({ winner, commandClose }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {commandClose() ; setShow(false)};
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (winner) {
      handleShow()
    }
  }
    , [winner])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>{winner + ' won'}</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>{'press Close to restart'}</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function checkWinner(player, positions) {
  // check row
  for (let i = 0; i < positions.length; i += cols) {
    let count = 0
    for (let j = 0; j < cols; j++) {
      if (positions[i + j] === player) {
        count++
      } else {
        count = 0
      }
      if (count === 4) {
        return true
      }
    }
  }
  // check col
  for (let i = 0; i < cols; i++) {
    let count = 0
    for (let j = 0; j < positions.length; j += cols) {
      if (positions[i + j] === player) {
        count++
      } else {
        count = 0
      }
      if (count === 4) {
        return true
      }
    }
  }
  // check diagonal
  for (let i = 0; i < positions.length; i += cols) {
    for (let j = 0; j < cols; j++) {
      if (positions[i + j] === player) {
        let count = 1
        let k = 1
        while (i + j + k * cols < positions.length && j + k < cols) {
          if (positions[i + j + k * cols] === player) {
            count++
          } else {
            break
          }
          if (count === 4) {
            return true
          }
          k++
        }
      }
    }
  }
  // check anti-diagonal
  for (let i = 0; i < positions.length; i += cols) {
    for (let j = 0; j < cols; j++) {
      if (positions[i + j] === player) {
        let count = 1
        let k = 1
        while (i + j - k * cols >= 0 && j + k < cols) {
          if (positions[i + j - k * cols] === player) {
            count++
          } else {
            break
          }
          if (count === 4) {
            return true
          }
          k++
        }
      }
    }
  }
  return false
}

function Position({ children, row, col, command }) {
  return (
    <div className="position" onClick={() => { command(row, col) }}>
      {children}
    </div>
  )
}


function App() {
  // states
  const [player, setPlayer] = useState(players.X)
  const [positions, setPositions] = useState(Array(rows * cols).fill(null))
  const [winner, setWinner] = useState(null)

  // effects
  useEffect(() => {
    console.log('postion changed')
  }, [positions])

  //functions
  const pressPosition = (row, col) => {
    update(row, col, player, setPlayer)
  }

  const update = (row, col, player, setPlayer) => {
    const newPositions = [...positions]
    if (winner) { return }
    console.log(row, col, player)
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
    console.log(colArray)
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
    console.log('reset')
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
