import { useEffect } from "react";
import { useMailApi } from "@/hooks/useMailApi";
import { useMailStore } from "../store";

export const useLoadMailbox = (type) => {
  // const setReceivedMails = useMailStore((state) => state.setReceivedMails);
  // const setSentMails = useMailStore((state) => state.setSentMails);
  const setDraftMails = useMailStore((state) => state.setDraftMails);
  const setSelfSentMails = useMailStore((state) => state.setSelfSentMails);
  const setImportantMails = useMailStore((state) => state.setImportantMails);
  const setSpamMails = useMailStore((state) => state.setSpamMails);
  const setDeletedMails = useMailStore((state) => state.setDeletedMails);
  const setStatus = useMailStore((state) => state.setStatus);
  const setError = useMailStore((state) => state.setError);
  const draftMails = useMailStore((s) => s.draftMails);
  const selfSentMails = useMailStore((s) => s.selfSentMails);
  const importantMails = useMailStore((s) => s.importantMails);
  const spamMails = useMailStore((s) => s.spamMails);
  const deletedMails = useMailStore((s) => s.deletedMails);

  const {
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    fetchSpamMails,
    fetchDeletedMails,
  } = useMailApi();

  useEffect(() => {
    const shouldFetch = () => {
      switch (type) {
        case "draft":
          return draftMails.length === 0;
        case "important":
          return importantMails.length === 0;
        case "self":
          return selfSentMails.length === 0;
        case "spam":
          return spamMails.length === 0;
        case "deleted":
          return deletedMails.length === 0;
        default:
          return false;
      }
    };
    if (!shouldFetch()) return;

    const load = async () => {
      setStatus("loading");
      try {
        let data;

        switch (type) {
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
          case "deleted":
            data = await fetchDeletedMails();
            setDeletedMails(data.emails);
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
  }, [
    type,
    draftMails,
    selfSentMails,
    importantMails,
    spamMails,
    deletedMails,
  ]);
};
