import "@components/mailBox/css/timeSortedList.css";
import MailListItem from "./mailListItem";
import { useCheckboxStore } from "../../store";
import { useEffect } from "react";

// test데이터 - 시간순
const timeSortedMails = [
  {
    id: 1,
    title: "[회의 일정 조정] 이번 주 회의 일정 변경 건",
    content:
      "안녕하세요 팀원 여러분,\n\n" +
      "이번 주 예정된 회의 일정이 변경되었습니다. 기존 일정이 월요일 오전 10시였으나, " +
      "고객사 요청으로 인해 수요일 오후 2시로 조정되었습니다.\n\n" +
      "📅 새로운 일정: 2025년 3월 8일 (수) 오후 2시\n" +
      "📍 장소: 본사 3층 회의실\n\n" +
      "이번 회의에서는 프로젝트 진행 상황 점검 및 다음 단계에 대한 논의가 있을 예정입니다. " +
      "준비해야 할 자료가 있으면 사전에 공유 부탁드립니다.\n\n" +
      "궁금한 점 있으시면 편하게 말씀해주세요.\n\n" +
      "감사합니다.\n\n" +
      "김철수 드림.",
    sender: "김철수",
    receiveAt: "2025-03-08 10:30",
    isImportant: true,
    isFileExist: false,
  },
  {
    id: 2,
    title: "프로젝트 진행 상황 공유",
    content:
      "안녕하세요 팀원 여러분,\n\n" +
      "이번 주까지 진행된 프로젝트 개발 현황을 공유드립니다.\n\n" +
      "✅ 프론트엔드 개발: 메인 페이지 UI 개발 완료, 반응형 최적화 진행 중\n" +
      "✅ 백엔드 개발: API 설계 완료, 데이터베이스 연동 테스트 중\n" +
      "✅ 디자인: 최신 UI 가이드 적용 완료\n\n" +
      "이번 주 금요일까지 1차 시안을 마무리할 예정이며, 다음 주 월요일 리뷰 미팅을 진행하려 합니다. " +
      "궁금한 사항이나 추가 요청사항 있으시면 댓글 남겨주세요.\n\n" +
      "감사합니다.\n\n" +
      "김철수 드림.",
    sender: "김철수",
    receiveAt: "2025-03-07 15:20",
    isImportant: false,
    isFileExist: true,
  },
  {
    id: 3,
    title: "RE: 프로젝트 진행 상황 공유",
    content:
      "철수님, 공유 감사합니다.\n\n" +
      "백엔드 API 연동 관련하여 몇 가지 궁금한 점이 있습니다.\n" +
      "1. 사용자 인증 방식이 JWT 기반으로 적용될 예정인가요?\n" +
      "2. 데이터베이스 스키마 변경 사항이 있다면 최신 문서를 공유해주실 수 있을까요?\n\n" +
      "이번 주 중에 한번 미팅을 잡고 논의하면 좋겠습니다.\n\n" +
      "감사합니다.\n\n" +
      "박민수 드림.",
    sender: "박민수",
    receiveAt: "2025-03-07 18:45",
    isImportant: false,
    isFileExist: false,
  },
  {
    id: 4,
    title: "[중요] 비밀번호 변경 안내",
    content:
      "안녕하세요, 네이버 고객센터입니다.\n\n" +
      "회원님의 계정 보안을 위해 비밀번호 변경을 권장드립니다.\n\n" +
      "최근 회원님의 계정에 로그인 시도가 여러 번 감지되었습니다. " +
      "이상이 있을 경우, 즉시 비밀번호를 변경해주시기 바랍니다.\n\n" +
      "📌 비밀번호 변경 방법:\n" +
      "1. 네이버 홈페이지에 접속 후 로그인\n" +
      "2. '내 정보' 페이지에서 '보안 설정' 선택\n" +
      "3. 비밀번호 변경 클릭 후 새로운 비밀번호 입력\n\n" +
      "안전한 인터넷 사용을 위해 정기적으로 비밀번호를 변경해 주세요.\n\n" +
      "감사합니다.\n\n" +
      "네이버 고객센터 드림.",
    sender: "네이버 고객센터",
    receiveAt: "2025-03-07 09:30",
    isImportant: true,
    isFileExist: false,
  },
  {
    id: 5,
    title: "점심 약속 확인",
    content:
      "철수야 안녕!\n\n" +
      "내일 점심 약속 가능하니? 오랜만에 만나서 이야기 나누고 싶어. " +
      "지난번에 갔던 파스타집 어때? 새로운 메뉴도 나왔다고 하더라고.\n\n" +
      "시간 괜찮으면 알려줘! 😊\n\n" +
      "영희 드림.",
    sender: "이영희",
    receiveAt: "2025-03-06 12:00",
    isImportant: false,
    isFileExist: false,
  },
  {
    id: 6,
    title: "RE: 점심 약속 확인",
    content:
      "영희야 안녕!\n\n" +
      "오랜만이야! 내일 점심 시간 괜찮아. 파스타집 좋지! " +
      "1시쯤 만나면 어때?\n\n" +
      "기대된다! 내일 봐~ 😊\n\n" +
      "철수 드림.",
    sender: "김철수",
    receiveAt: "2025-03-06 13:00",
    isImportant: false,
    isFileExist: false,
  },
  {
    id: 7,
    title: "[주문 확인] 고객님의 주문이 완료되었습니다.",
    content:
      "안녕하세요, 고객님.\n\n" +
      "주문하신 상품이 정상적으로 접수되었습니다.\n\n" +
      "📦 주문 상품: Apple MacBook Pro 14'' (M2, 16GB RAM, 512GB SSD)\n" +
      "🚚 예상 배송일: 2025년 3월 10일\n\n" +
      "배송이 시작되면 별도 안내 메일을 보내드리겠습니다.\n" +
      "주문 내역 확인 및 배송 조회는 [주문내역 페이지]에서 가능합니다.\n\n" +
      "감사합니다.\n\n" +
      "Amazon 드림.",
    sender: "Amazon",
    receiveAt: "2025-03-05 21:15",
    isImportant: false,
    isFileExist: true,
  },
];

/**
 * TimeSortedList - 시간순 정렬된 메일 목록을 표시하는 컴포넌트
 * @returns {JSX.Element} 시간순으로 정렬된 메일 리스트 UI
 */
const TimeSortedList = () => {
  const mails = useCheckboxStore((state) => state.mails);
  const setMails = useCheckboxStore((state) => state.setMails);

  useEffect(() => {
    setMails(timeSortedMails);
  }, []);

  return (
    <div className="timeSortedList-wrapper">
      {/* 헤더: "시간순 보기" 라벨 및 아이콘 */}
      <div className="timeSortedList-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill="#A87CF6" />
        </svg>
        <span className="timeSortedList-title">시간순 보기</span>
      </div>

      {/* 메일 목록 컨테이너 */}
      <div className="timeSortedList-container">
        {mails?.length > 0 ? (
          mails.map((mail) => <MailListItem key={mail.id} mail={mail} />)
        ) : (
          <p>📩 메일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSortedList;
