import "@components/mailBox/css/mailListHeaderM.css";
import { useState } from "react";
import { useSortStore, SORT_OPTIONS } from "../../store";
import { useLocation } from "react-router-dom";
import Search from "@assets/icons/search.svg?react";
import People from "@assets/icons/people.svg?react";
import Time from "@assets/icons/time.svg?react";
import Menu from "@assets/icons/menu.svg?react";

const MailListHeaderM = () => {
  const location = useLocation();

  const sortOption = useSortStore((state) => state.sortOption);
  const changeSortOption = useSortStore((state) => state.changeSortOption);

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false); // 정렬 옵션 상태

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  // 메일 타이틀 기본값
  let mailTitle = "";

  /**
   * 현재 위치에 따라 헤더 내용 동적으로 변경
   */
  switch (true) {
    case location.pathname.includes("/sent"):
      mailTitle = "보낸메일함";
      break;
    case location.pathname.includes("/deleted"):
      mailTitle = "휴지통";
      break;
    case location.pathname.includes("/draft"):
      mailTitle = "임시보관함";
      break;
    case location.pathname.includes("/scheduled"):
      mailTitle = "예약메일함";
      break;
    case location.pathname.includes("/receive"):
      mailTitle = "받은메일함";
      break;
    case location.pathname.includes("/important"):
      mailTitle = "중요메일함";
      break;
    case location.pathname.includes("/selfsent"):
      mailTitle = "내게쓴메일함";
      break;
    case location.pathname.includes("/spam"):
      mailTitle = "스팸메일함";
      break;
    default:
      break;
  }

  return (
    <div className="mailListHeaderM-wrapper">
      <div className="mailListHeaderM-left">
        {/* 햄버거 메뉴 */}
        <button>
          <Menu className="mailListHeaderM-icon" />
        </button>
        {/* 정렬 옵션 */}
        <div className="mailListHeaderM-sortOptions">
          <button
            className="mailListHeaderM-sortOptions-items"
            onClick={toggleOption}
          >
            {sortOption === SORT_OPTIONS.SENDER ? (
              <People className="mailListHeaderM-icon" />
            ) : (
              <Time className="mailListHeaderM-icon" />
            )}
          </button>

          {isSortOptionOpen && (
            <div className="mailListHeaderM-sortOptions-container">
              <p onClick={() => handleSortOptionClick(SORT_OPTIONS.TIME)}>
                시간순 보기
              </p>
              <p onClick={() => handleSortOptionClick(SORT_OPTIONS.SENDER)}>
                받은사람 묶어보기
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 메일함 타이틀 */}
      <p className="mailListHeaderM-title">{mailTitle}</p>

      {/* 검색 아이콘 */}
      <button>
        <Search className="mailListHeaderM-icon" />
      </button>
    </div>
  );
};
export default MailListHeaderM;
