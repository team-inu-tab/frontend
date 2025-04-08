import { useEffect } from "react";
import { useMailStore } from "../store";
import { useMailApi } from "./useMailApi";

export const useInitMailbox = () => {
  const { fetchReceiveMails, fetchSentMails } = useMailApi();

  const setReceivedMails = useMailStore((s) => s.setReceivedMails);
  const setSentMails = useMailStore((s) => s.setSentMails);
  const setGroupedMails = useMailStore((s) => s.setGroupedMails);
  const setStatus = useMailStore((s) => s.setStatus);
  const status = useMailStore((s) => s.status);

  useEffect(() => {
    const init = async () => {
      setStatus("loading");

      let receiveMails = [];
      let sentMails = [];

      try {
        const res = await fetchReceiveMails();
        receiveMails = res.emails;
        setReceivedMails(receiveMails);
      } catch (err) {
        console.error("📨 받은 메일 로딩 실패:", err);
      }

      try {
        const res = await fetchSentMails();
        sentMails = res.emails;
        setSentMails(sentMails);
      } catch (err) {
        console.error("📤 보낸 메일 로딩 실패:", err);
      }

      const allMails = [...receiveMails, ...sentMails];
      setGroupedMails(allMails);

      if (receiveMails.length || sentMails.length) {
        setStatus("succeeded");
      } else {
        setStatus("failed");
      }
    };

    if (status === "idle") {
      init();
    }
  }, [status]);
};
