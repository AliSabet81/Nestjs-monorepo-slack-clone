import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../store/api";
import { login, logout } from "../store/auth";
import { RootState } from "../store";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const {
    data,
    isError,
    isFetching: isLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: isAuthenticated,
  });

  useEffect(() => {
    if (data && !isAuthenticated) {
      dispatch(login({ user: data.data }));
    }
    if (isError && isAuthenticated) {
      dispatch(logout());
    }
  });

  return {
    isLoading,
    isAuthenticated,
  };
};
