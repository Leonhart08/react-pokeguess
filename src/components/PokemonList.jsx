import { useState, useRef, useContext, useEffect } from 'react'
import StateContext from './../context'

import { PokemonInput } from './PokemonInput';
import { PokemonInputLoader } from './PokemonInputLoader'

export const PokemonList = ({ list, gameState }) => {
  const inputRefs = useRef([])

  const { state } = useContext(StateContext);

  const { guessedIndexes } = state

  const checkOutOfRange = (event, index) => {
    if (event.key === 'ArrowUp') {
      return index !== 0
    }
     
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      return index !== (list.length - 1)
    } 

    if (event.key === 'ArrowLeft') {
      return index > 19
    } 

    if (event.key === 'ArrowRight') {
      return index < list.length - 20
    } 
  }

  const handleKeyDown = (event, index) => {
    const { selectionStart, selectionEnd, value } = event.target;

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      checkOutOfRange(event, index) && changeFocusInput("UP", index)
      return
    } 

    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault()
      checkOutOfRange(event, index) && changeFocusInput("DOWN", index)
      return
    }

    if (event.key === 'ArrowRight' && selectionEnd === value.length) {
      event.preventDefault()
      checkOutOfRange(event, index) &&changeFocusInput("DOWN", index + 19)
      return
    }

    if (event.key === 'ArrowLeft' && selectionStart === value.length) {
      event.preventDefault()
      checkOutOfRange(event, index) && changeFocusInput("DOWN", index - 21)
      return
    }
  }

  const changeFocusInput = (event, index) => {
    if(event === 'UP') {
      if(guessedIndexes.includes(index - 1)){
        changeFocusInput(event, index - 1 )
      } else {
        inputRefs.current[index - 1].focus()
      }
    }

    if(event === 'DOWN') {
      if(guessedIndexes.includes(index + 1)){
        changeFocusInput(event, index + 1 )
      } else {
        inputRefs.current[index + 1].focus()
      }
    }
  }


  return (
    <>
      <div className='pokemon-list__container' >
        {(gameState === 'selectGen')
         ? [...Array(100).keys()].map((element, index) => <PokemonInputLoader key={`pokemon-${index}-loader`} index={index}  /> )
         : list.map((element, index) => (
          <div key={`pokemon-input-${index}`} onKeyDown={event => handleKeyDown(event, index)}>
            <PokemonInput 
              key={`pokemon-${index}`} 
              index={index} 
              pokemon={element}
              ref={el => (inputRefs.current[index] = el)}
              handleKeyDown={handleKeyDown}
              handleOnGuess={(event, index) => (index !== (list.length - 1)) && changeFocusInput(event, index)}
            /> 
          </div>
        ))
        }
      </div>
    </>
  )
}
