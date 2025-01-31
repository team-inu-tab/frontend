import "@components/mailBox/css/mailListHeader.css";
import useMailCheck from "@hooks/useMailCheck";

const MailListHeader = () => {
  const { selectedCount, selectAll } = useMailCheck();

  return (
    <div className="mailListHeader-wrapper">
      {/* 체크박스, 읽음, 삭제 */}
      <div className="mailActions">
        <input type="checkbox" onChange={(e) => selectAll(e.target.checked)} />
        <p>전체 선택</p>
        {selectedCount > 0 && (
          <div>
            <p>읽음</p>
            <p>삭제</p>
          </div>
        )}
      </div>
      {/* 정렬 옵션 */}
      <div className="sortOptions">
        <div className="sortOptions-items">
          <p>시간순 보기</p>
          <p>받은사람 묶어보기</p>
        </div>
      </div>
      {/* 답장, 전달 등 메일함별 기능 */}
      <div className="mailTools"></div>
      {/* 검색창 */}
      <div className="searchBar">검색</div>
    </div>
  );
};
export default MailListHeader;
