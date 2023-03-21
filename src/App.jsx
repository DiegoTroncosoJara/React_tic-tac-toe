import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"

import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from "./components/WinnerModal"


function App() {
  // Se crea el tablero
  const [board, setBoard] = useState( () => {
    const tableroDesdeStorage = window.localStorage.getItem('tablero')
    return tableroDesdeStorage ? JSON.parse(tableroDesdeStorage) : Array(9).fill(null)
  }) 
  const [turn, setTurn] = useState( () => {
    const turnoDesdeStorage = window.localStorage.getItem('turno')
    return turnoDesdeStorage ?? TURNS.X // Empieza las X
  }) 
  const [winner, setWinner] = useState(null) // null: no hay ganador / False: Empate
  
  // Se actualiza el tablero
  const updateBoard = (index) => {
    // No actualizamos la posicion si ya tiene algo
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Si el turno es de la X entonces le toca al O y viceversa
    // y se actualiza el estado
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar partida y turno
    window.localStorage.setItem('tablero', JSON.stringify(newBoard))
    window.localStorage.setItem('turno', newTurn)
     
    // Revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turno')
  }
  

  return (
    <main className="board">
      <h1>Tic tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
                
            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>

      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
