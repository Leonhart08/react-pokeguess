
import { useReducer } from 'react';
import StateContext from './context';
import reducer from './reducer';

const initialState = {
  gameState: 'selectGen',
  configuration: { currentGen: null, currentTime: {}, range: null },
  total: null,
  answers: 0,
  guessedIndexes: []
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
