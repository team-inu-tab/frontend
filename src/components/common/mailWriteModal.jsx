import { useState, useRef, useEffect } from "react";
import "@components/common/css/mailWriteModal.css";
import MailContainer from "@components/common/mailWriteContainer.jsx";
import ToggleSwitch from "@components/common/toggleSwitch.jsx";
import Link from "@assets/icons/link.svg";
import aiOnLogo from "@assets/icons/ai.svg";
import WriteContainer from "@components/common/mailWritingContainer.jsx";
import SendComplete from "@screens/sendCompleteScreen.jsx";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import { useMailApi } from "@hooks/useMailApi.js";
import { api } from "@hooks/useMailApi";
import { useLocation, useParams } from "react-router-dom";
import { parseGmailContent } from "../../utils/parseGmailContent";
import { extractEmailAddress } from "../../utils/emailUtils";

function MailWriteModal() {
  const [isAiOn, setIsAiOn] = useState(false);
  const [mailTitle, setMailTitle] = useState("");
  const [recieverTitle, setRecieverTitle] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showComplete, setShowComplete] = useState(false);

  const tagifyInputRef = useRef(null);
  const fileInputRef = useRef(null);
  let tagifyInstance = null;
  const { mailId } = useParams();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  const { getToken, refresh, getMailById } = useMailApi();

  /**
   * 답장/전달 모드인 경우 메일 정보 로딩
   */
  const [decodedBody, setDecodedBody] = useState("");

  useEffect(() => {
    if (!mailId) return;

    const fetchMailDetail = async () => {
      try {
        const res = await getMailById(mailId);

        // content 파싱 및 이미지 포함 본문, 첨부파일 렌더링
        if (res?.content) {
          const { html } = await parseGmailContent(res.content, res.id);
          setDecodedBody(html);
        }

        // 답장
        if (mode === "reply") {
          setMailTitle(`RE: ${res.title}`);
          const senderEmail = extractEmailAddress(res.sender);
          setRecieverTitle(JSON.stringify([{ value: senderEmail }]));
        }

        // 전달
        if (mode === "forward") {
          setMailTitle(`FW: ${res.title}`);
          setRecieverTitle("");
        }

        // 임시 메일 수정
        if (mode === "draft") {
          setMailTitle(res.title);
          const senderEmail = extractEmailAddress(res.sender);
          setRecieverTitle(JSON.stringify([{ value: senderEmail }]));
        }
      } catch (err) {
        console.error("메일 로딩 실패:", err);
      }
    };

    fetchMailDetail();
  }, [mailId, mode]);

  // 메일 주소 작성 후 엔터 클릭 시 태깅
  useEffect(() => {
    if (tagifyInputRef.current) {
      tagifyInstance = new Tagify(tagifyInputRef.current, {});

      tagifyInstance.on("change", (e) => {
        setRecieverTitle(e.detail.value);
      });
    }
    return () => {
      if (tagifyInstance) {
        tagifyInstance.destroy();
      }
    };
  }, []);

  // esc 눌렀을 때 AI 기능 off
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsAiOn(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 메일 발신
  const sendMail = async () => {
    const formData = new FormData();

    const mergedBody = `
  ${mailBody}
  
  <br/><br/>
  <!-- 원문 메일 -->
  ${decodedBody || ""}
  `;

    let mailData = {
      toEmail: JSON.parse(recieverTitle),
      subject: mailTitle,
      body: mailBody,
    };
    // 답장, 전달 시 사용자 입력과 HTML을 묶어서 하나의 본문으로 전송
    if (decodedBody.length > 0 && ["reply", "forward"].includes(mode)) {
      mailData = {
        toEmail: JSON.parse(recieverTitle),
        subject: mailTitle,
        body: mergedBody,
      };
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(mailData)], { type: "application/json" }),
      "data.json"
    );

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await getToken();
      const res = await api.post("mails/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log("메일 전송 성공");
        setShowComplete(true);
      }
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      if (error.response?.status === 401) {
        try {
          await refresh();
          const retryRes = await api.post("mails/send", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (retryRes.status === 200) {
            console.log("메일 전송 성공");
            setShowComplete(true);
          }
        } catch (retryError) {
          console.error("메일 전송 재시도 실패:", retryError);
          alert("메일 전송에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("메일 전송에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (showComplete) {
    return <SendComplete />;
  }

  return (
    <MailContainer>
      <input
        className="mailTitle"
        placeholder="제목을 입력하세요."
        value={mailTitle}
        onChange={(e) => setMailTitle(e.target.value)}
      />

      <div className="recieverTitleContainer">
        <p className="recieverLabel">받는사람</p>
        <input ref={tagifyInputRef} className="recieverTitle" />
        <p className="toMeText">내게 쓰기</p>
        <input type="checkbox" className="isToMe" />
      </div>

      <div className="refTitleContainer">
        <p className="refLabel">참조</p>
        <input className="refTitle" />
      </div>

      <div className="attachedContainer">
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <img
          src={Link}
          className="attatchedIcon"
          alt="link icon"
          onClick={() => fileInputRef.current.click()}
        />
        <p className="attachedLabel">
          {selectedFile ? selectedFile.name : "DROP HERE!"}
        </p>
      </div>

      <div className="switchContainer">
        {isAiOn && <img src={aiOnLogo} className="aiOnLogo" alt="ai on logo" />}
        <p className={`aiText ${isAiOn ? "on" : ""}`}>TabAI</p>
        <ToggleSwitch
          className="aiToggleSwitch"
          checked={isAiOn}
          onChange={() => setIsAiOn(!isAiOn)}
        />
      </div>

      <WriteContainer
        className={isAiOn ? "writeContainer on" : "writeContainer"}
        value={mailBody}
        onChange={setMailBody}
        htmlContent={decodedBody}
      />

      <div className="buttonContainer">
        <button className="reservationButton">예약하기</button>
        <button
          className="sendButton"
          onClick={() => {
            sendMail();
          }}
        >
          전송하기
        </button>
      </div>
    </MailContainer>
  );
}

export default MailWriteModal;
