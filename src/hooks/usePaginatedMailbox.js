import { useMailApi } from "@/hooks/useMailApi";
import { useMailStore } from "@/store";

export const usePaginatedMailbox = () => {
  const {
    fetchReceiveMails,
    fetchSentMails,
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    fetchSpamMails,
    fetchDeletedMails,
  } = useMailApi();

  const nextPageTokenByBox = useMailStore((s) => s.nextPageTokenByBox);
  const setNextPageToken = useMailStore((s) => s.setNextPageToken);
  const appendMails = useMailStore((s) => s.appendMails);

  const fetchMoreMails = async (boxType) => {
    const nextToken = nextPageTokenByBox[boxType];
    if (!nextToken) return; // 더 이상 불러올 데이터 없음

    let fetchFn = undefined;
    switch (true) {
      case boxType === "receive":
        fetchFn = fetchReceiveMails;
        break;
      case boxType === "sent":
        fetchFn = fetchSentMails;
        break;
      case boxType === "deleted":
        fetchFn = fetchDeletedMails;
        break;
      case boxType === "draft":
        fetchFn = fetchDraftMails;
        break;
      case boxType === "important":
        fetchFn = fetchImportantMails;
        break;
      case boxType === "selfSent":
        fetchFn = fetchSelfSentMails;
        break;
      case boxType === "spam":
        fetchFn = fetchSpamMails;
        break;
      default:
    }

    const res = await fetchFn(nextToken);

    appendMails(boxType, res.emails);
    setNextPageToken(boxType, res.nextPageToken ?? null);
  };

  return { fetchMoreMails };
};
