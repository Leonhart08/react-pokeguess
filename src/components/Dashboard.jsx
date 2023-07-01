import { useState, useContext, useEffect } from 'react'
import StateContext from './../context'

import { Button } from './Button';

import { Timer } from './Timer'

export const DashBoard = (props) => {
  const { state, dispatch } = useContext(StateContext);
  
  const { gameState, currentGen, answers, total } = state

  return (
    <div className='dashboard__container'>
      <div> 
        <h1> Pokedex Quiz </h1>
      </div>
      <div>
        <span> {`Generation #${currentGen}`} </span>
      </div>
      <div>
        <h3> {` Total Guessed: ${answers} / ${total} `} </h3>
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