import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react"
import { initialState, IInitialState, ActionReducer } from "./StateReducer"

export const StateContext = createContext<[IInitialState, React.Dispatch<ActionReducer>]>([initialState, () => {}]);

type IProvider = {
  reducer: React.Reducer<IInitialState, ActionReducer>;
  initialState: IInitialState;
};

export const StateProvider: React.FC<PropsWithChildren<IProvider>> = ({ children, reducer, initialState }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider: () => [IInitialState, Dispatch<ActionReducer>] = () => useContext(StateContext);
