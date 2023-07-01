import { useContext, useState, useEffect, useRef } from 'react'
import StateContext from './../context'

export const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [counting, setCounting] = useState(false);
  const { dispatch, state } = useContext(StateContext);

  const Ref = useRef(null);

  const { gameState } = state

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  useEffect(() => {
    if(gameState === 'playing') {
      setCounting(true)
      setTimer(60)

      const id = setInterval(() => {
        setTimer(prevCount => prevCount - 1);
      }, 1000)

      Ref.current = id;
    }

    if(gameState !== 'playing' && Ref.current) {
      clearInterval(Ref.current)
    }
  
  }, [gameState]);

  useEffect(() => {
    if(Ref.current && timer === 0) {
      clearInterval(Ref.current)
      setCounting(false)
      Ref.current = null

      dispatch({ type: 'FINISH_GAME' })
    } 
  }, [timer]);

  return (
    <div className='timer__container'>
      <div> {`00:${zeroPad(Math.floor(timer / 60),2) }:${zeroPad(timer % 60, 2)}`} </div>
    </div>
  )
}

60

'00:00'


