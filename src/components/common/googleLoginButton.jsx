import { useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogIn = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/google?token=${encodeURIComponent(token)}`;

    try {
      await axios.get(redirectUrl, { withCredentials: true });
      navigate("/test");
    } catch (error) {
      console.error("로그인 요청 실패:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="776239999845-1l9ai960n66udm13vhcgeredtlr0e76q.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("로그인 실패");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLogIn;