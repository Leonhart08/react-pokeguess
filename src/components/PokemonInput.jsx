import React, { useState, useContext, useEffect } from 'react'
import StateContext from './../context'

import { FaRegQuestionCircle } from 'react-icons/fa'

export const PokemonInput = React.forwardRef((props, ref) => {
  const { index, pokemon, handleOnGuess } = props
  const { id: pokemonId, type } = pokemon

  const { state, dispatch } = useContext(StateContext);

  const { gameState } = state
  const [currentInput, setCurrentInput] = useState('')
  const [guessed, setGuessed] = useState(false)

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  const pokemonName = pokemon.name.english.toLowerCase() || ''

  useEffect(() => {
    if(currentInput.toLowerCase() === pokemonName) {
      dispatch({ type: 'SET_CORRECT_POKEMON_ANSWER', guessedIndex: index });
      setGuessed(true)
      handleOnGuess('DOWN', index)
    }
  },[currentInput])

  return (
    <div className='pokemon-list__element'>
      <div className='pokemon-list__element-number'> 
        {`# ${zeroPad(pokemonId,3)}`}  
      </div> 
      { guessed ? (
        <div className='pokemon-list__element-sprite'>  
          <img src={`sprites/${zeroPad(pokemonId,3)}MS.png`} />
        </div>
        ) :
        <div className='pokemon-list__element-question-icon'>  
          <FaRegQuestionCircle />
        </div>
      }
      <div className={`pokemon-list__element-input pokemon-list__element-input--${type[0].toLowerCase()}`}> 
        {!guessed && (
          <input
            id={`pokemon-input-${index}`}
            type="text" 
            name={`pokemon-name-${index}`}
            size="10"
            ref={ref}
            value={currentInput}
            disabled={gameState !== 'playing'}
            onChange={(event) => setCurrentInput(event.target.value)} 
          />
        )}
        {
          guessed && <div className={'pokemon-list__element-answer'}> {pokemonName} </div>
        }
      </div>
    </div>
  )
})

PokemonInput.displayName = 'PokemonInput'