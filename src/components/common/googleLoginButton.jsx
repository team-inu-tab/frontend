import { useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

axios.defaults.withCredentials = true;

const GoogleLogIn = () => {
  const linkRef = useRef(null);

  // 액세스 토큰 재발급 요청 함수
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://likelionfesival.shop/oauth2/reissue",
        {},
        { withCredentials: true }
      );

      const accessToken = response.headers["authorization"]; // 액세스 토큰 추출
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // 저장
        console.log("새로운 액세스 토큰:", localStorage.getItem("accessToken"));
      } else {
        console.error("액세스 토큰을 찾을 수 없음");
      }
    } catch (error) {
      console.error("액세스 토큰 갱신 실패:", error);
    }
  };

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/google?token=${encodeURIComponent(
      token
    )}`;

    if (linkRef.current) {
      linkRef.current.href = redirectUrl;
      linkRef.current.click();
    }

    window.addEventListener("focus", refreshAccessToken);
  };

  return (
    <GoogleOAuthProvider clientId="776239999845-1l9ai960n66udm13vhcgeredtlr0e76q.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("로그인 실패");
        }}
      />
      <a ref={linkRef} style={{ display: "none" }}></a>
    </GoogleOAuthProvider>
  );
};

export default GoogleLogIn;
