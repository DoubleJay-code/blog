const defaultState = {
  value: '',
};

export const textValue = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
