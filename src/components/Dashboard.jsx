import { useState, useContext, useEffect } from 'react'
import StateContext from './../context'

import { Button } from './Button';

import { Timer } from './Timer'

export const DashBoard = (props) => {
  const { state, dispatch } = useContext(StateContext);
  
  const { gameState, configuration, answers, total } = state

  const { currentGen } = configuration

  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    if(gameState === 'playing') {
      setHighlight(true)
      setTimeout(() => setHighlight(false), 200)
    }
  }, [answers])

  return (
    <div className='dashboard__container'>
      <div> 
        <h1> Pokedex Quiz </h1>
      </div>
      <div>
        <span> {`Generation # ${currentGen}`} </span>
      </div>
      <div className='dashboard__score-container'>
        <div className='dashboard__score-title'> 
          SCORE
        </div>
        <div className={`dashboard__score-number ${highlight ? 'dashboard__score-number--highlight' : 'dashboard__score-number--normal'}`}>
          {total && (<div> <span> {answers} </span> / {total} </div>)}
        </div> 
      </div>
      <Timer />
      <div className='dashboard__button-section'>
         <Button 
          text={gameState === 'playing' ? 'Change Gen' : 'Try Again'} 
          handleClick={() => dispatch({ type: 'RESET_GAME' })} 
        />
      </div>
    </div>
  )
}