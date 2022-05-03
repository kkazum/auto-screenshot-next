import React, { ReactNode, useReducer, useContext } from "react";
import { reducer, initialState, actions } from "../../lib/context/reducer";
import { StSnackbar } from "../shared/Snackbar";
import { StoreContext, DispatchContext } from "../../lib/context";

type Props = {
  children: ReactNode;
};

export const Layout: React.VFC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <StoreContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
          <Snackbar />
        </DispatchContext.Provider>
      </StoreContext.Provider>
    </>
  );
};

const Snackbar: React.VFC = () => {
  const { snackbar } = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  return (
    <StSnackbar
      open={!!snackbar?.visible}
      message={snackbar?.message || ""}
      handleClose={() => dispatch(actions.hideSnackbar())}
      error={snackbar?.error}
    />
  );
};
