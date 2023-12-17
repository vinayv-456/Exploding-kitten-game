import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getLeaderBoard,
  requestGameState,
  putGameState,
  setUserName,
} from "../store/actions";

const actions = {
  getLeaderBoard,
  requestGameState,
  putGameState,
  setUserName,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
