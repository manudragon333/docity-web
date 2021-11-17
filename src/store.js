import { createStore, compose, applyMiddleware } from "redux";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { rootSagas } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, {}, compose(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSagas);

export default store;
