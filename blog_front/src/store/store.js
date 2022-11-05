import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { titleValue } from './titleReduser';
import { textValue } from './textReduser';
import { allPosts } from './postReduer';

const rootReduser = combineReducers({
  inputTitle: titleValue,
  inputText: textValue,
  allPosts: allPosts,
});

export const store = createStore(rootReduser, composeWithDevTools());
