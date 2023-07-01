
const initialState = {
  gameState: 'selectGen',
  currentGen: null,
  total: null,
  answers: 0,
  guessedIndexes: [],
  range: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_GEN': {
      const { gen, range } = action 
      const { firstIndex, lastIndex } = range

      return { ...state, currentGen: gen, gameState: 'playing', range, total: lastIndex - firstIndex };
    }
    case 'CHANGE_GAME_STATE':
      return { ...state };
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