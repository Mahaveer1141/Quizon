import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../redux/userSlice";
import { AppDispatch } from "../utills/types";
import Home from "./Home/Home";

const HomeWrapper: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);

  return <Home />;
};

export default HomeWrapper;
