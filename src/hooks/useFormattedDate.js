import dayjs from "dayjs";
import { useCallback } from "react";

export function useFormattedDate() {
  /**
   * @param {string} isoDate - 예: "2025-02-24T19:30:00.622589"
   * @returns {string} - 예: "2025.2.24 19:30"
   */
  const formatReceiveDate = useCallback((isoDate) => {
    if (!isoDate) return "";
    const parsed = dayjs(isoDate);
    if (!parsed.isValid()) return "";
    return parsed.format("YYYY.M.D H:mm");
  }, []);

  return formatReceiveDate;
}
