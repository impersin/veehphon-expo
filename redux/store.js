import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { reducer } from './reducers';

const logger = createLogger();

const finalCreateStore = compose(applyMiddleware(logger))(createStore);

const configure = (initialState = { auth: 'false', user: null }) =>
  finalCreateStore(
    reducer,
    initialState
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default configure;
