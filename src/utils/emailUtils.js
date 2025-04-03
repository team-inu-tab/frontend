import dayjs from "dayjs";

/**
 * @param {string} isoDate - 예: "2025-02-24T19:30:00.622589"
 * @returns {string} - 예: "2025.2.24 19:30"
 */
export const formatReceiveDate = (isoDate) => {
  if (!isoDate) return "";
  const parsed = dayjs(isoDate);
  if (!parsed.isValid()) return "";
  return parsed.format("YYYY.M.D H:mm");
};

/**
 * 수신자/발신자 문자열에서 이름만 추출하는 함수
 * @param {string} rawSender
 * @returns {string} 이름 부분만 추출된 문자열
 */
export const extractSenderName = (rawSender) => {
  if (!rawSender) return "";

  // "이름" <이메일> 형식
  if (/^".*"\s*<.*>$/.test(rawSender)) {
    return rawSender.replace(/^"(.*)"\s*<.*>$/, "$1").trim();
  }

  // 이름 <이메일> 형식
  if (/^.*<.*>$/.test(rawSender)) {
    return rawSender.replace(/^(.*?)\s*<.*>$/, "$1").trim();
  }

  // 그냥 이메일 또는 이름인 경우
  return rawSender.trim();
};
