import { useContext, useState } from 'react'
import StateContext from './../context'

import generationData from './../data/generation.json'

import { FaRegClock, FaReact } from 'react-icons/fa'
import { Button } from './Button'

const GEN_STARTER_SPRITES = ['001', '158', '255', '387', '501', '653', '722']

const TIMES = [
  { label: '2 min', value: 120, key: '2-min-button-option'},
  { label: '5 min', value: 300, key: '5-min-button-option'},
  { label: '10 min', value: 600, key: '10-min-button-option'}
]

export const SelectGenModal = () => {

  const { state, dispatch } = useContext(StateContext)
  const { configuration } = state
  const { currentGen, currentTime } = configuration

  const gameCanStart = (currentGen && currentTime.value)

  return (
    <div className='select-gen-modal__container'>
      <div className='select-gen-modal'>
        <div className='select-gen-modal__wrapper'>
          <div className='select-gen-modal__title'>
            <div> React PokeQuiz </div> 
            <FaReact /> 
          </div>
          <div className='select-gen-modal__options'>
            {generationData.map(({id, generation, first_index: firstIndex, last_index: lastIndex}, index) => {

              return (
                <div 
                  key={`generation-${id}`} 
                  className={`select-gen-modal__button ${currentGen === generation ? 'select-gen-modal__button--highlight' : ''}`} 
                  onClick={(() => dispatch({ type: 'SELECT_GEN', gen: generation, range: {firstIndex, lastIndex} }))}
                > 
                  <div className='select-gen-modal__button-sprite'>  
                    <img src={`sprites/${GEN_STARTER_SPRITES[index]}MS.png`} />
                  </div> 
                  <div className='select-gen-modal__button-text'> Generation <span>{`#${generation}`}</span> </div>
                </div>
              )
            })}
          </div>
          <div className='select-gen-modal__separator'/>
          <div className='select-gen-modal__options'>
            {TIMES.map(time => {
              return (
                <div
                  key={time.key}
                  className={`select-gen-modal__button ${currentTime.value === time.value ? 'select-gen-modal__button--highlight' : ''}`} 
                  onClick={(() => dispatch({ type: 'SELECT_TIME', time}))}
                >
                  <div className='select-gen-modal__button-sprite'>  
                    <FaRegClock />
                  </div> 
                  <div className='select-gen-modal__button-text'> 
                    {time.label} 
                  </div>
                </div>
              )
            })}
          </div>
          <div className='select-gen-modal__submit-button-section'> 
            <Button 
              text={gameCanStart ? 'Play!' : "Select Options"} 
              isDisabled={!gameCanStart}
              handleClick={() => dispatch({ type: 'START_GAME' })} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}