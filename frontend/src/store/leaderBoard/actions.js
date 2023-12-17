import axiosInstance from "../../apis/client";
import {
  REQUEST_LEADERBOARD_PENDING,
  REQUEST_LEADERBOARD_SUCCESS,
} from "../../utilis/constants";

const getLeaderBoard = () => async (dispatch) => {
  dispatch({ type: REQUEST_LEADERBOARD_PENDING });
  try {
    const result = await axiosInstance.get("/leader-board");
    dispatch({ type: REQUEST_LEADERBOARD_SUCCESS, payload: result });
  } catch (e) {
    console.log(e);
  }
};

export { getLeaderBoard };
