import { FaRegQuestionCircle } from 'react-icons/fa'

export const PokemonInputLoader = ({ index }) => {
  const zeroPad = (num, places) => String(num).padStart(places, '0')

  return (
    <div className='pokemon-list__element'>
      <div className='pokemon-list__element-number'> 
        {`# ${zeroPad(index + 1,3)}`}  
      </div> 
      <div className='pokemon-list__element-question-icon'>  
        <FaRegQuestionCircle />
      </div>

      <div className={`pokemon-list__element-input pokemon-list__element-input--loading`}> 
        <input
          id={`pokemon-input-${index}`}
          type="text" 
          name={`pokemon-name-${index}`}
          size="10"
          disabled
        />
      </div>
    </div>
  )
}