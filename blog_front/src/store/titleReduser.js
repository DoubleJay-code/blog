const defaultState = {
  value: '',
};

export const titleValue = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
