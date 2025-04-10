import "@components/mailBox/css/mailPreviewContainer.css";
import MailPreviewItem from "./mailPreviewItem";
import { useMailStore } from "../../store";
import { useEffect, useRef } from "react";

/**
 * MailPreviewContainer - 메일 미리보기 목록을 감싸는 컨테이너 컴포넌트
 * @returns {JSX.Element} 메일 미리보기 리스트 UI
 */
const MailPreviewContainer = () => {
  const selectedGroup = useMailStore((state) => state.selectedGroup);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedGroup]);

  if (!Array.isArray(selectedGroup) || selectedGroup.length === 0) {
    return null;
  }

  return (
    <div className="mailPreviewContainer-wrapper">
      {selectedGroup.map((mail) => (
        <MailPreviewItem key={mail.id} mail={mail} />
      ))}
      {/* 하단으로 스크롤 유도용 엘리먼트 */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MailPreviewContainer;
