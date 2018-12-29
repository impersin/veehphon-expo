export const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH':
      return Object.assign({}, state, {
        auth: action.payload.auth,
        user: action.payload.user
      });
    default:
      return state;
  }
};
