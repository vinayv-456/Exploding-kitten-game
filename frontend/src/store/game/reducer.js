import {
  REQUEST_GAME_STATE_FAILED,
  REQUEST_GAME_STATE_SUCCESS,
  REQUEST_GAME_STATE_PENDING,
  SET_GAME_STATE_PENDING,
  SET_GAME_STATE_SUCCESS,
  SET_GAME_STATE_FAILED,
  PUT_GAME_STATE_PENDING,
  PUT_GAME_STATE_SUCCESS,
  SET_USERNAME_SUCCESS,
} from "../constants";

const INTIAL_STATE = {
  gameCards: null,
  isPending: true,
  score: 0,
  hasDefuseCard: false,
  activeCard: "",
};

export const gameStateReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_USERNAME_SUCCESS:
      return { ...state, user_name: action.payload };
    case REQUEST_GAME_STATE_PENDING:
      return { ...state, isPending: true };
    case REQUEST_GAME_STATE_SUCCESS:
      let gameCardsArr = [];
      if (action.payload?.data?.gamecards?.length > 0) {
        gameCardsArr = action.payload?.data?.gamecards?.split(",");
      }
      return {
        ...state,
        gameCards: gameCardsArr,
        activeCard: action.payload?.data?.activeCard,
        hasDefusedCard: action.payload?.data?.hasDefusedCard,
        isPending: false,
        score: action.payload?.data?.score,
      };
    case REQUEST_GAME_STATE_FAILED:
      return { ...state, error: action.payload };
    case SET_GAME_STATE_PENDING:
      return { ...state, isPending: true };
    case SET_GAME_STATE_SUCCESS:
      return {
        ...state,
        gameCards: action.payload?.gameCards,
        isPending: false,
      };
    case SET_GAME_STATE_FAILED:
      return { ...state, error: action.payload };
    case PUT_GAME_STATE_PENDING:
      return { ...state, isPending: true };
    case PUT_GAME_STATE_SUCCESS:
      return {
        ...state,
        gameCards: action.payload?.gameCards,
        activeCard: action.payload?.activeCard,
        hasDefusedCard: action.payload?.hasDefusedCard,
        isPending: false,
        score: action.payload?.score,
      };
    default:
      return state;
  }
};
