import React, { useState, useContext, useEffect } from 'react'
import StateContext from './../context'

import { FaRegQuestionCircle } from 'react-icons/fa'

import POKEMON_TYPES from './../data/types.json'

export const PokemonInput = React.forwardRef((props, ref) => {
  const { index, pokemon, handleOnGuess } = props
  const { id: pokemonId, type: typeArray } = pokemon

  const { state, dispatch } = useContext(StateContext);

  const { gameState } = state
  const [currentInput, setCurrentInput] = useState('')
  const [guessed, setGuessed] = useState(false)
  const [highlight, setHighlight] = useState(false)

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  const pokemonName = pokemon.name.english.toLowerCase() || ''

  useEffect(() => {
    if(currentInput.toLowerCase() === pokemonName) {
      dispatch({ type: 'SET_CORRECT_POKEMON_ANSWER', guessedIndex: index });
      setGuessed(true)
      setHighlight(true)
      setTimeout(() => setHighlight(false), 200)
      handleOnGuess('DOWN', index)
    }
  },[currentInput])


  const getInputTypeBackground = () => {
    if(typeArray.length === 1){
      return { backgroundImage: `linear-gradient(135deg, ${POKEMON_TYPES[typeArray[0].toLowerCase()]} 50%, ${POKEMON_TYPES[typeArray[0].toLowerCase()]} 50%)`}
    }
    if(typeArray.length === 2){
      return { backgroundImage: `linear-gradient(135deg,${POKEMON_TYPES[typeArray[0].toLowerCase()]} 30%, ${POKEMON_TYPES[typeArray[1].toLowerCase()]} 70%)`}
    }
  }

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
            style={getInputTypeBackground()} 
          />
        )}
        {
          (guessed || gameState === 'gameFinished') 
            && 
            <div className={`
              pokemon-list__element-answer 
              ${guessed && 'pokemon-list__element-answer--answered'} 
              ${guessed && `${highlight ? 'pokemon-list__element-answer--highlight' : 'pokemon-list__element-answer--normal'}`}
            `}
            > 
              {pokemonName} 
            </div>
        }
      </div>
    </div>
  )
})

PokemonInput.displayName = 'PokemonInput'