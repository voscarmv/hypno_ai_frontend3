import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chatReducer from './chatSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
