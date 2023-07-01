import { useState, useContext } from 'react'

import StateContext from './context'

import { PokemonList } from './components/PokemonList'
import { DashBoard } from './components/Dashboard'
import { SelectGenModal } from './components/SelectGenModal'
import pokeDexData from './data/pokedex.json'

const App = () => {
  const { state, dispatch } = useContext(StateContext);
  
  const { currentGen, gameState, range } = state
  
  
  const getPokemonGen = (pokedex, currentGen) => {
    if(!currentGen) return []

    const { firstIndex, lastIndex } = range

    return pokeDexData.slice(firstIndex, lastIndex)
  } 

  const pokemonList = getPokemonGen(pokeDexData, currentGen)

  return (
    <>
      <div className={`container ${gameState === 'selectGen' ? 'container--blurred' : ''}`}>
        <div className='dashboard'>
          <DashBoard />
        </div>
        <PokemonList
          gameState={gameState} 
          list={pokemonList} 
        />
      </div>
      {gameState === 'selectGen' && <SelectGenModal gameState={gameState} /> }
    </>
  )
}

export default App
