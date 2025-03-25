import "@components/mailBox/css/mailDetail.css";
import { useEffect, useState } from "react";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";
import { useMailApi } from "@/hooks/useMailApi";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import FileItem from "./fileItem";

/**
 * MailDetail - 선택된 메일의 상세 내용을 표시하는 컴포넌트
 * @returns {JSX.Element | null} 메일 상세 정보 UI (선택된 메일이 없으면 null 반환)
 */
const MailDetail = () => {
  const [mailDetail, setMailDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedMailId = useMailStore((state) => state.selectedMailId); // 현재 선택된 메일 id 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);

  const formatReceiveDate = useFormattedDate();

  const { fetchMailDetail, getFile } = useMailApi();

  useEffect(() => {
    if (!selectedMailId) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const detail = await fetchMailDetail(selectedMailId);
        setMailDetail(detail);
      } catch (error) {
        console.error("Error fetching mail detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [selectedMailId, fetchMailDetail]);

  // 선택된 메일이 없으면 화면에 표시하지 않음
  if (!selectedMailId) {
    return <div>No mail selected</div>;
  }

  // 메일 상세 정보가 로딩 중일 경우
  if (isLoading && !mailDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mailDetail-wrapper">
      <div className="mailDetail-container">
        {/* 메일 제목 및 발신자 정보 */}
        <div className="mailDetail-header">
          <div className="mailDetail-header-container">
            <span className="mailDetail-title">{mailDetail.title}</span>
            <span className="mailDetail-sender">
              보낸사람: {mailDetail.sender}
            </span>
            <span className="mailDetail-sender">
              받는사람: {mailDetail.receiver}
            </span>
          </div>
          {/* 확장 버튼 */}
          <ExpandArrow onClick={toggleExpanded} />
        </div>

        {/* 첨부 파일 */}
        {mailDetail.fileName.length > 0 && (
          <div className="mailDetail-files">
            <span className="mailDetail-files-title">
              첨부파일 {mailDetail.file.length}개
            </span>
            <div className="mailDetail-files-list">
              {mailDetail.file.map((fileName, index) => (
                <FileItem
                  key={index}
                  fileName={fileName}
                  onClick={() => getFile({ emailId: mailDetail.id, fileName })}
                />
              ))}
            </div>
          </div>
        )}

        {/* 메일 본문 내용 */}
        <div className="mailDetail-content">{mailDetail.content}</div>
      </div>

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetail-footer">
        <span className="mailDetail-receiveAt">
          {formatReceiveDate(mailDetail.receiveAt ?? mailDetail.sendAt)}
        </span>
      </div>
    </div>
  );
};
export default MailDetail;
