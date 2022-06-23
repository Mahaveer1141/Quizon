import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../redux/userSlice";
import { AppDispatch, RootState } from "../utills/types";
import { getAcessToken } from "../utills/utils";

const BackwardProtectedRoute: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { me, status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return status === "success" &&
    me.username !== undefined &&
    getAcessToken() !== "" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default BackwardProtectedRoute;
