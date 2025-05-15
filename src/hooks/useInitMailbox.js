import { useMailApi } from "@/hooks/useMailApi";
import { useMailStore } from "@/store";

export const useInitMailbox = () => {
  const { fetchReceiveMails, fetchSentMails } = useMailApi();

  const setReceivedMails = useMailStore((s) => s.setReceivedMails);
  const setSentMails = useMailStore((s) => s.setSentMails);
  const setGroupedMails = useMailStore((s) => s.setGroupedMails);
  const setStatus = useMailStore((s) => s.setStatus);
  const setError = useMailStore((s) => s.setError);
  const setNextPageToken = useMailStore((s) => s.setNextPageToken);
  const appendMails = useMailStore((s) => s.appendMails);

  const initMailbox = async (pageTokens = null, append = false) => {
    if (!append) setStatus("loading");

    try {
      const receiveRes = await fetchReceiveMails(pageTokens?.receive);
      const sentRes = await fetchSentMails(pageTokens?.sent);

      const receiveMails = receiveRes.emails;
      const sentMails = sentRes.emails;

      setNextPageToken("receive", receiveRes.nextPageToken);
      setNextPageToken("sent", sentRes.nextPageToken);

      if (append) {
        appendMails("receive", receiveMails);
        appendMails("sent", sentMails);

        const currentReceive = useMailStore.getState().receiveMails;
        const currentSent = useMailStore.getState().sentMails;

        setGroupedMails([...currentReceive, ...currentSent]);
      } else {
        await Promise.all([
          setReceivedMails(receiveMails),
          setSentMails(sentMails),
        ]);

        setGroupedMails([...receiveMails, ...sentMails]);
        setStatus("succeeded");
      }
    } catch (error) {
      console.error("메일 초기화 실패:", error);
      setError("메일함 초기화 실패");
      setStatus("failed");
      throw error;
    }
  };

  return initMailbox;
};
