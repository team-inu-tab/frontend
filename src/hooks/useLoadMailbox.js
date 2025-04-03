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
            setReceivedMails(data);
            setGroupedReceiveMails(data);
            break;
          case "sent":
            data = await fetchSentMails();
            setGroupedSentMails(data);
            setSentMails(data);
            break;
          case "draft":
            data = await fetchDraftMails();
            setDraftMails(data);
            break;
          case "important":
            data = await fetchImportantMails();
            setImportantMails(data);
            break;
          case "self":
            data = await fetchSelfSentMails();
            setSelfSentMails(data);
            break;
          case "spam":
            data = await fetchSpamMails();
            console.log("스팸 메일 불러옴:", data);
            setSpamMails(data);
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
