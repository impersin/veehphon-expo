export const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH':
      return Object.assign({}, state, {
        auth: action.payload
      });
    default:
      return state;
  }
};
