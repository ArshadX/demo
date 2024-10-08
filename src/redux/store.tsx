import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commentSlice } from "./commentSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";


const persistConfig = {
    key:'root',
    storage: AsyncStorage
  }
  
  const rootReducer =combineReducers({
    comments:commentSlice.reducer
  })

const persistedReducer = persistReducer(persistConfig,rootReducer)
  export const store = configureStore({
      reducer:persistedReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
      }),
  })
  export type IRootState = ReturnType<typeof rootReducer>
  export type AppDispatch = typeof store.dispatch
  export const persistor = persistStore(store)