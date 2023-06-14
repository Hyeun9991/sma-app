import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// Redux의 상태 지속성을 위해 Redux Persist를 사용하는 설정
// Redux Persist를 활용하여 Redux 상태를 로컬 스토리지에 지속적으로 저장하고,
// 페이지 재로드 시에도 상태를 유지할 수 있도록 구성하는데 사용됨.
const persistConfig = { key: 'root', storage, version: 1 }; // Redux 상태 지속성을 위한 설정 객체를 생성
const persistedReducer = persistReducer(persistConfig, authReducer); // 지속성을 적용한 리듀서를 생성
const store = configureStore({
  reducer: persistedReducer, // 지속성이 적용된 리듀서를 스토어에 등록
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // 휘발성 액션을 무시할 경로를 지정
      },
    }), // 직렬화 가능성 검사를 위한 미들웨어를 설정
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
