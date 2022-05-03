import { Actions, initialState, RootState } from '../context/reducer';
import { createContext, Dispatch } from 'react';

export const StoreContext = createContext<RootState>(initialState);
export const DispatchContext = createContext<Dispatch<Actions>>(() => null);
