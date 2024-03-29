//------------------------------------------------------------//-

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import allNotesSliceReducer from './allNotes'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  debug: true, // Add this option to enable logging
};

const rootReducer = combineReducers({ user: userReducer,allNotes:allNotesSliceReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)