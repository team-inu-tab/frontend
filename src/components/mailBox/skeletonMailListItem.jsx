import "@components/mailBox/css/skeletonMailListItem.css";

const SkeletonMailListItem = () => {
  return (
    <div className="mailListItem-wrapper">
      {/* 체크박스 자리 */}
      <div className="mailListItem-custom-checkBox">
        <div className="skeleton-checkmark shimmer"></div>
      </div>

      {/* 별 아이콘 자리 */}
      <div className="mailListItem-star-container">
        <div className="skeleton-star shimmer"></div>
      </div>

      {/* 메일 정보 자리 */}
      <div className="mailListItem-mailInfo">
        <div className="skeleton-sender shimmer"></div>

        <div className="mailListItem-title-container">
          {/* 첨부파일 아이콘 자리 생략 (선택사항) */}
          <div className="skeleton-title shimmer"></div>
        </div>

        <div className="skeleton-receiveAt shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonMailListItem;
