export const reducer = (state, action) => {
  console.log('action ====>', action);
  console.log(state);
  switch (action.type) {
    case 'AUTH':
      return Object.assign({}, state, {
        auth: action.payload
      });
    default:
      return state;
  }
};
