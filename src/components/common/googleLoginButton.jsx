const GoogleLogIn = () => {
  const handleLogin = () => {
    window.location.href =
      "http://maeilmail.co.kr/api/oauth2/authorization/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 rounded bg-blue-500 text-white"
    >
      구글 로그인
    </button>
  );
};

export default GoogleLogIn;
