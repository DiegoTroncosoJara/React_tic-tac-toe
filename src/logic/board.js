import { WINNER_COMBOS } from "../constants"

// Revisamos todas las combinaciones ganadoras 
export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
    boardToCheck[a] &&
    boardToCheck[a] == boardToCheck[b] &&
    boardToCheck[a] == boardToCheck[c]
    ) {
    return boardToCheck[a]
    }
  }
  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // newBoard = ['x','o', null, ...]
  // Revisamos si todas las celdas es distinto a null
  // osea ya se hizo todos los movimientos es pq termino el juego
  return newBoard.every((celdas) => celdas !== null)
}

