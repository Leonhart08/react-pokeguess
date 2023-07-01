import {  useContext } from 'react'
import StateContext from './../context'

import generationData from './../data/generation.json'

const GEN_STARTER_SPRITES = ['001', '158', '255', '387', '501', '653', '722']

export const SelectGenModal = () => {

  const { dispatch } = useContext(StateContext)

  return (
    <div className='select-gen-modal__container'>
      <div className='select-gen-modal'>
        <div className='select-gen-modal__wrapper'>
          <div className='select-gen-modal__title'>
            Select Gen to start:
          </div>
          <div className='select-gen-modal__options'>
            {generationData.map(({id, generation, first_index: firstIndex, last_index: lastIndex}, index) => {
              return(
                <div 
                  key={`generation-${id}`} 
                  className='select-gen-modal__button' 
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
        </div>
      </div>
    </div>
  )
}