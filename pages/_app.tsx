import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { createContext, useReducer } from "react";
import { TransformedCafeData } from "common/types/cafeList";

export interface State {
  latLong: string;
  coffeeStores: TransformedCafeData[];
}
interface Action {
  type: string;
  payload: {
    latLong: string;
    coffeeStores: TransformedCafeData[];
  };
}
export const StoreContext = createContext(
  {} as { state: State; dispatch: React.Dispatch<Action> }
);

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: State = {
    latLong: "",
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
