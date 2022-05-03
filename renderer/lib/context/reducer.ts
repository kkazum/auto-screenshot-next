import { CreatorsToActions } from "../types/CreatorsToActions";

const actionTypes = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
} as const;

type SnackBarState = {
  visible: boolean;
  message: string;
  error?: boolean;
};

export const actions = {
  showSnackbar: (message: string, error?: boolean) => {
    return {
      type: actionTypes.SHOW_SNACKBAR,
      payload: {
        message,
        error,
      },
    };
  },
  hideSnackbar: () => {
    return {
      type: actionTypes.HIDE_SNACKBAR,
      payload: {
        type: actionTypes.HIDE_SNACKBAR,
      },
    };
  },
};

export type Actions = CreatorsToActions<typeof actions>;

export type RootState = {
  snackbar: SnackBarState | undefined;
};

export const initialState: RootState = {
  snackbar: undefined,
};

export const reducer = (state: RootState, action: Actions) => {
  switch (action.type) {
    case actionTypes.SHOW_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          visible: true,
          message: action.payload.message,
          error: action.payload.error,
        },
      };
    }
    case actionTypes.HIDE_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          visible: false,
          message: "",
          erroe: false,
        },
      };
    }
    default:
      return state;
  }
};
