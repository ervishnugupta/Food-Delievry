import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const ProtectWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { token, showLogin, setShowLogin } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      // Save the path user tried to visit
      localStorage.setItem("redirectAfterLogin", location.pathname);
      setIsAuthenticated(false);
      setShowLogin(true); // Trigger login popup
    }
  }, [location.pathname, setShowLogin]);

  useEffect(() => {
    if (token) {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath && redirectPath !== location.pathname) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      }
      setIsAuthenticated(true);
    }
  }, [token, navigate, location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        ⚠️ You need to login first.
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectWrapper;
