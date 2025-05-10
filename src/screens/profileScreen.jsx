import "@screens/css/profileScreen.css";
import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../components/menu/menuBar";
import { useMenuStore } from "../store";
import { useMailApi } from "../hooks/useMailApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  const { logout } = useMailApi();

  const handleButtonClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      toast.error("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="ProfileScreen-wrapper">
      <MenuBar />
      <div
        className={`ProfileScreen-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <button onClick={handleButtonClick}>로그아웃</button>
      </div>
    </div>
  );
};
export default ProfileScreen;
