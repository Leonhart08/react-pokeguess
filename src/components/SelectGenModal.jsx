import {  useContext } from 'react'
import StateContext from './../context'

import generationData from './../data/generation.json'

export const SelectGenModal = () => {

  const { dispatch } = useContext(StateContext);

  return (
    <div className='select-gen-modal'>
      <div className='select-gen-modal__wrapper'>
        <div className='select-gen-modal__title'>
          Select Gen to start:
        </div>
        <div className='select-gen-modal__options'>
          {generationData.map(({id, generation, first_index: firstIndex, last_index: lastIndex}) => {
            return(
              <div 
                key={`generation-${id}`} 
                className='select-gen-modal__button' 
                onClick={(() => dispatch({ type: 'SELECT_GEN', gen: generation, range: {firstIndex, lastIndex} }))}
              > 
                {`Generation #${generation}`} 
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}