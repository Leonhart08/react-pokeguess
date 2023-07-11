
const initialState = {
  gameState: 'selectGen',
  configuration: {
    currentGen: null,
    range: null,
    currentTime: {} 
  },
  total: null,
  answers: 0,
  guessedIndexes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_GEN': {
      const { gen, range } = action 
      const { firstIndex, lastIndex } = range

      return { 
        ...state,
        configuration: {
          ...state.configuration,
          currentGen: gen, 
          range  
        },
        total: lastIndex - firstIndex
      }
    }
    case 'SELECT_TIME': {
      const { time } = action 

      return { 
        ...state,
        configuration: { ...state.configuration, currentTime: time }
      }
    }
    case 'START_GAME':
      return { ...state, gameState: 'playing' };
    case 'RESET_GAME':
      return { ...initialState };
    case 'FINISH_GAME': {
      return { ...state, gameState: 'gameFinished' }
    }
    case 'SET_CORRECT_POKEMON_ANSWER':
        return { ...state, answers: (state.answers + 1), guessedIndexes: [...state.guessedIndexes, action.guessedIndex] };
    default:
      return state;
  }
};

export default reducer;