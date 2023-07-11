import { useContext, useState, useEffect, useRef } from 'react'
import StateContext from './../context'

export const Timer = () => {
  const [timer, setTimer] = useState(null);
  const [counting, setCounting] = useState(false);
  const { dispatch, state } = useContext(StateContext);

  const Ref = useRef(null);

  const { gameState, configuration } = state
  const { currentTime = {} } = configuration
  const { value: initialCountDown } = currentTime

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  console.log('Ref.current', Ref.current)
  useEffect(() => {
    if(gameState === 'playing') {
      setCounting(true)
      
      setTimer(initialCountDown)

      const id = setInterval(() => {
        console.log('interval')
        setTimer(prevCount => prevCount - 1);
      }, 1000)

      Ref.current = id;
    }

    if(gameState !== 'playing' && Ref.current) {
      console.log('Clearing Interval 1')
      setTimer(null)
      clearInterval(Ref.current)
    }
  
  }, [gameState]);

  useEffect(() => {
    if(Ref.current && timer === 0) {
      console.log('Clearing Interval 2')
      clearInterval(Ref.current)
      setCounting(false)
      Ref.current = null

      dispatch({ type: 'FINISH_GAME' })
    } 
  }, [timer]);

  return (
    <div className='timer__container'>
      <div className='timer__title'> TIMER </div>
      <div className='timer__countdown' > {`00:${zeroPad(Math.floor(timer / 60),2) }:${zeroPad(timer % 60, 2)}`} </div>
    </div>
  )
}
