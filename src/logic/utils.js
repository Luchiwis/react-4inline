import { cols, rows } from '../constants'
export function checkWinner(player, positions) {
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
