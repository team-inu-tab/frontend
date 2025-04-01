export const getMailBoxConfig = ({ pathname, stores, actions }) => {
  const {
    receiveMails,
    sentMails,
    draftMails,
    importantMails,
    deletedMails,
    scheduledMails,
    selfSentMails,
    spamMails,
  } = stores;

  const { handleMarkSpam, handleUnmarkSpam } = actions;

  // boxType, mails, mailTools 반환
  if (pathname.includes("/receive")) {
    return {
      boxType: "receive",
      mails: receiveMails,
      mailTools: (
        <>
          <button>답장</button>
          <button>전달</button>
          <button>중요</button>
          <button onClick={handleMarkSpam}>스팸차단</button>
        </>
      ),
    };
  }

  if (pathname.includes("/important")) {
    return {
      boxType: "important",
      mails: importantMails,
      mailTools: (
        <>
          <button>답장</button>
          <button>전달</button>
          <button>중요</button>
          <button onClick={handleMarkSpam}>스팸차단</button>
        </>
      ),
    };
  }

  if (pathname.includes("/deleted")) {
    return {
      boxType: "deleted",
      mails: deletedMails,
      mailTools: (
        <>
          <button>복원</button>
          <button>영구삭제</button>
          <button onClick={handleMarkSpam}>스팸차단</button>
        </>
      ),
    };
  }

  if (pathname.includes("/draft")) {
    return {
      boxType: "draft",
      mails: draftMails,
      mailTools: <></>,
    };
  }

  if (pathname.includes("/scheduled")) {
    return {
      boxType: "scheduled",
      mails: scheduledMails,
      mailTools: (
        <>
          <button>전달</button>
          <button>보내기취소</button>
          <button>시간변경</button>
        </>
      ),
    };
  }

  if (pathname.includes("/selfsent")) {
    return {
      boxType: "selfsent",
      mails: selfSentMails,
      mailTools: (
        <>
          <button>전달</button>
          <button>중요</button>
          <button>수정</button>
        </>
      ),
    };
  }

  if (pathname.includes("/sent")) {
    return {
      boxType: "sent",
      mails: sentMails,
      mailTools: (
        <>
          <button>답장</button>
          <button>전달</button>
          <button>중요</button>
        </>
      ),
    };
  }

  if (pathname.includes("/spam")) {
    return {
      boxType: "spam",
      mails: spamMails,
      mailTools: (
        <>
          <button>영구삭제</button>
          <button onClick={handleUnmarkSpam}>스팸해제</button>
        </>
      ),
    };
  }

  return {
    boxType: "",
    mails: [],
    mailTools: null,
  };
};
