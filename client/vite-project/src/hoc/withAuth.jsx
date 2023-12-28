import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const auth = useSelector((state) => state.auth);
    return auth.token ? <Navigate to="/" /> : <Component {...props} />;
  };
  return AuthRoute;
};

export default withAuth;
