import "@components/mailBox/css/mailDetailMax.css";
import { useEffect, useState } from "react";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";
import { useFormattedDate } from "../../hooks/useFormattedDate";
import { useMailApi } from "@/hooks/useMailApi";
import FileItem from "./fileItem";

const MailDetailMax = () => {
  const [mailDetail, setMailDetail] = useState(null);

  const selectedMailId = useMailStore((state) => state.selectedMailId); // 현재 선택된 메일 id 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);

  const formatReceiveDate = useFormattedDate();

  const { fetchMailDetail, getFile } = useMailApi();

  useEffect(() => {
    if (!selectedMailId) return;

    const load = async () => {
      const detail = await fetchMailDetail(selectedMailId);
      setMailDetail(detail);
    };

    load();
  }, [selectedMailId]);

  // 선택된 메일이 없으면 화면에 표시하지 않음
  if (!selectedMailId) {
    return null;
  }

  return (
    <div className="mailDetailMax-wrapper">
      <div className="mailDetailMax-container">
        {/* 메일 제목 및 발신자 정보 */}
        <div className="mailDetailMax-header">
          <div className="mailDetailMax-header-container">
            <span className="mailDetailMax-title">{mailDetail.title}</span>
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
        {mailDetail.fileName.length && (
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
        <div className="mailDetailMax-content">{mailDetail.content}</div>
      </div>

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetailMax-footer">
        <span className="mailDetailMax-receiveAt">
          {formatReceiveDate(mailDetail.receiveAt ?? mailDetail.sendAt)}
        </span>
      </div>
    </div>
  );
};
export default MailDetailMax;
