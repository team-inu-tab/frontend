import { useEffect } from "react";
import { useMailStore } from "../store";
import { useMailApi } from "./useMailApi";

export const useInitMailbox = () => {
  const { fetchReceiveMails, fetchSentMails } = useMailApi();

  const setReceivedMails = useMailStore((s) => s.setReceivedMails);
  const setSentMails = useMailStore((s) => s.setSentMails);
  const setGroupedMails = useMailStore((s) => s.setGroupedMails);
  const setStatus = useMailStore((s) => s.setStatus);
  const setError = useMailStore((s) => s.setError);

  useEffect(() => {
    const init = async () => {
      setStatus("loading");
      try {
        const [received, sent] = await Promise.all([
          fetchReceiveMails(),
          fetchSentMails(),
        ]);

        const receiveMails = received.emails;
        const sentMails = sent.emails;

        const allMails = [...receiveMails, ...sentMails];

        setReceivedMails(receiveMails);
        setSentMails(sentMails);
        setGroupedMails(allMails);

        setStatus("succeeded");
      } catch (err) {
        setError(err.message ?? "메일 초기 로딩 실패");
        setStatus("failed");
      }
    };

    init();
  }, []);
};
