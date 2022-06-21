import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../redux/userSlice";
import { AppDispatch, RootState } from "../utills/types";

const ProtectedRoute: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { username, status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return status === "failed" && username === "" ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
