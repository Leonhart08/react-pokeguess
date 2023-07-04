import React, { useState, useContext, useEffect } from 'react'
import StateContext from './../context'

import { FaRegQuestionCircle } from 'react-icons/fa'

import POKEMON_TYPES from './../data/types.json'

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
      <div className={`pokemon-list__element-number ${!guessed && gameState === 'gameFinished' && 'pokemon-list__element-number--disabled'}`}> 
        {`# ${zeroPad(pokemonId,3)}`}  
      </div> 
      { (guessed || gameState === 'gameFinished') ? (
        <div className={`pokemon-list__element-sprite ${!guessed && gameState === 'gameFinished' && 'pokemon-list__element-sprite--disabled'}`}>  
          <img src={`sprites/${zeroPad(pokemonId,3)}MS.png`} />
        </div>
        ) :
        <div className='pokemon-list__element-question-icon'>  
          <FaRegQuestionCircle />
        </div>
      }
      <div className={`pokemon-list__element-input`}> 
        {(!guessed && gameState === 'playing') && (
          <input
            id={`pokemon-input-${index}`}
            type="text" 
            name={`pokemon-name-${index}`}
            size="10"
            ref={ref}
            value={currentInput}
            disabled={gameState !== 'playing'}
            onChange={(event) => setCurrentInput(event.target.value)}
            style={{'backgroundColor': POKEMON_TYPES[type[0].toLowerCase()]}} 
          />
        )}
        {
          (guessed || gameState === 'gameFinished') 
            && 
            <div className={`pokemon-list__element-answer ${guessed && 'pokemon-list__element-answer--answered'}`}> 
              {pokemonName} 
            </div>
        }
      </div>
    </div>
  )
})

PokemonInput.displayName = 'PokemonInput'