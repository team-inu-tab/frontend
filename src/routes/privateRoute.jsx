import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useMailApi } from "../hooks/useMailApi";

const PrivateRoute = ({ children }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [checked, setChecked] = useState(false);

  const { refresh } = useMailApi();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (!accessToken) {
        try {
          await refresh();
        } catch {
          navigate("/");
        } finally {
          setChecked(true);
        }
      } else {
        setChecked(true);
      }
    };

    checkToken();
  }, []);

  if (checked && !accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
