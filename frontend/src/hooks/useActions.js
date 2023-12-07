import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getLeaderBoard,
  requestGameState,
  setGameState,
  putGameState,
  setUserName,
} from "../store/actions";

const actions = {
  getLeaderBoard,
  requestGameState,
  setGameState,
  putGameState,
  setUserName,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
