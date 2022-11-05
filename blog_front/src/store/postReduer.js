const defaultState = {
  value: [],
};

export const allPosts = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_POST':
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
