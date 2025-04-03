import { useEffect } from "react";
import { useMailApi } from "@/hooks/useMailApi";
import { useMailStore } from "../store";

export const useLoadMailbox = (type) => {
  const setReceivedMails = useMailStore((state) => state.setReceivedMails);
  const setSentMails = useMailStore((state) => state.setSentMails);
  const setDraftMails = useMailStore((state) => state.setDraftMails);
  const setSelfSentMails = useMailStore((state) => state.setSelfSentMails);
  const setImportantMails = useMailStore((state) => state.setImportantMails);
  const setSpamMails = useMailStore((state) => state.setSpamMails);
  const setGroupedReceiveMails = useMailStore(
    (state) => state.setGroupedReceiveMails
  );
  const setGroupedSentMails = useMailStore(
    (state) => state.setGroupedSentMails
  );
  const setStatus = useMailStore((state) => state.setStatus);
  const setError = useMailStore((state) => state.setError);

  const {
    fetchReceiveMails,
    fetchSentMails,
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    fetchSpamMails,
  } = useMailApi();

  useEffect(() => {
    const load = async () => {
      setStatus("loading");
      try {
        let data;

        switch (type) {
          case "receive":
            data = await fetchReceiveMails();
            console.log("📦 fetchDraftMails 응답:", data); // 전체 객체
            console.log("✅ data.mails:", data.emails); // 반드시 배열
            console.log("✅ isArray:", Array.isArray(data.emails)); // true 이어야 함
            setReceivedMails(data.emails);
            setGroupedReceiveMails(data.emails);
            break;
          case "sent":
            data = await fetchSentMails();
            setGroupedSentMails(data.emails);
            setSentMails(data.emails);
            break;
          case "draft":
            data = await fetchDraftMails();
            setDraftMails(data.emails);
            break;
          case "important":
            data = await fetchImportantMails();
            setImportantMails(data.emails);
            break;
          case "self":
            data = await fetchSelfSentMails();
            setSelfSentMails(data.emails);
            break;
          case "spam":
            data = await fetchSpamMails();
            setSpamMails(data.emails);
            break;
          default:
            throw new Error("메일 타입을 찾을 수 없습니다.");
        }

        setStatus("succeeded");
      } catch (err) {
        setError(err.message || "메일 불러오기 실패");
        setStatus("failed");
      }
    };

    load();
  }, [type]);
};
