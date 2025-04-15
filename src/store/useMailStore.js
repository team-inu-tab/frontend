import { create } from "zustand";
import { extractEmailAddress } from "../utils/emailUtils";

export const useMailStore = create((set) => ({
  // 메일 리스트 (시간순)
  receiveMails: null,
  sentMails: [
    {
      id: "19622ef2e514a288",
      title: "첨부파일 테스트",
      content: {
        body: {
          size: 0,
        },
        filename: "",
        headers: [
          {
            name: "MIME-Version",
            value: "1.0",
          },
          {
            name: "Date",
            value: "Fri, 11 Apr 2025 12:40:22 +0900",
          },
          {
            name: "Message-ID",
            value:
              "<CAJ5OzRPtBJ-a2eowu4O3zfRsCxFkbH14WH3gUNhZ2VrRqA0UEQ@mail.gmail.com>",
          },
          {
            name: "Subject",
            value: "첨부파일 테스트",
          },
          {
            name: "From",
            value: '"한경은" <gyeongeh@gmail.com>',
          },
          {
            name: "To",
            value: "oozan0035@gmail.com",
          },
          {
            name: "Content-Type",
            value: 'multipart/mixed; boundary="0000000000004d9a490632787616"',
          },
        ],
        mimeType: "multipart/mixed",
        partId: "",
        parts: [
          {
            body: {
              size: 0,
            },
            filename: "",
            headers: [
              {
                name: "Content-Type",
                value:
                  'multipart/alternative; boundary="0000000000004d9a470632787614"',
              },
            ],
            mimeType: "multipart/alternative",
            partId: "0",
            parts: [
              {
                body: {
                  data: "DQo=",
                  size: 2,
                },
                filename: "",
                headers: [
                  {
                    name: "Content-Type",
                    value: 'text/plain; charset="UTF-8"',
                  },
                ],
                mimeType: "text/plain",
                partId: "0.0",
              },
              {
                body: {
                  data: "PGRpdiBkaXI9Imx0ciI-PGJyPjwvZGl2Pg0K",
                  size: 27,
                },
                filename: "",
                headers: [
                  {
                    name: "Content-Type",
                    value: 'text/html; charset="UTF-8"',
                  },
                ],
                mimeType: "text/html",
                partId: "0.1",
              },
            ],
          },
          {
            body: {
              attachmentId:
                "ANGjdJ81yh1nAnVuouLxrjoDpjwToNF55XAhVcA8aRe1iFnKMRzWwYW_I0prTwUQt7FY6VrYssV4A5k8_VyBO-2OtaUDU9E5J70fU4mrTIkMTPE7ozdA97AOUwP4tQp-74thYWBavwbgdlFkkuf5QzFoPCPkyRUyMW7fkTOf1Kg0alRbuXUSuQGj3qB9BZs1VumFJJITjsPAjR1QxL_Lj2dRZuFM1ZVlmgDp01yHkytKaAVbmVxHzJ3GGzejD6TUbTNseS30aOM6Qa2FE7EakPdl3Z615CC-bGUW5tKpObKf5ibKuB6SknMHFCUHSjU",
              size: 474423,
            },
            filename: "Week 6 - 에라토스테네스의 체.pdf",
            headers: [
              {
                name: "Content-Type",
                value:
                  'application/pdf; name="Week 6 - 에라토스테네스의 체.pdf"',
              },
              {
                name: "Content-Disposition",
                value:
                  'attachment; filename="Week 6 - 에라토스테네스의 체.pdf"',
              },
              {
                name: "Content-Transfer-Encoding",
                value: "base64",
              },
              {
                name: "X-Attachment-Id",
                value: "f_m9c8o2to0",
              },
              {
                name: "Content-ID",
                value: "<f_m9c8o2to0>",
              },
            ],
            mimeType: "application/pdf",
            partId: "1",
          },
          {
            body: {
              attachmentId:
                "ANGjdJ9tOxJj3Z8wgBApHy8LMep7fN0Wr-x7xLTmCwoCbESYkZEs8lbTh8EWf8gxVTUCyRVJSz56iSj1EK4sK9EtOn81g2DLTQ0yYkrRqBb3yO0k0GPeLLdZGCHc3LeS_OZqkuHIjxd4B3t9fUTaStUnSuTuQoP7Jwn4jmbyPGo2Hp6zQr37aBFBB_n1PW9VeKFBdhrx_gcLC1G22NRYfRcGVn0hUJPbmUVxkv-k_Rl95GPr2d3jjqfvwMX3RIqpYtoGHyhCa-6ca36VuoYElHYqppas6UZnrAnCmvjfSMZJW4lPLSTmBy-u3Lt693A",
              size: 1177472,
            },
            filename: "5.행렬.pdf",
            headers: [
              {
                name: "Content-Type",
                value: 'application/pdf; name="5.행렬.pdf"',
              },
              {
                name: "Content-Disposition",
                value: 'attachment; filename="5.행렬.pdf"',
              },
              {
                name: "Content-Transfer-Encoding",
                value: "base64",
              },
              {
                name: "X-Attachment-Id",
                value: "f_m9c8o6n91",
              },
              {
                name: "Content-ID",
                value: "<f_m9c8o6n91>",
              },
            ],
            mimeType: "application/pdf",
            partId: "2",
          },
        ],
      },
      receiver: "oozan0035@gmail.com",
      sendAt: "2025-04-11T12:40:22",
      isImportant: false,
      fileNameList: [
        {
          fileName: "Week 6 - 에라토스테네스의 체.pdf",
          attachmentId:
            "ANGjdJ81yh1nAnVuouLxrjoDpjwToNF55XAhVcA8aRe1iFnKMRzWwYW_I0prTwUQt7FY6VrYssV4A5k8_VyBO-2OtaUDU9E5J70fU4mrTIkMTPE7ozdA97AOUwP4tQp-74thYWBavwbgdlFkkuf5QzFoPCPkyRUyMW7fkTOf1Kg0alRbuXUSuQGj3qB9BZs1VumFJJITjsPAjR1QxL_Lj2dRZuFM1ZVlmgDp01yHkytKaAVbmVxHzJ3GGzejD6TUbTNseS30aOM6Qa2FE7EakPdl3Z615CC-bGUW5tKpObKf5ibKuB6SknMHFCUHSjU",
        },
        {
          fileName: "5.행렬.pdf",
          attachmentId:
            "ANGjdJ9tOxJj3Z8wgBApHy8LMep7fN0Wr-x7xLTmCwoCbESYkZEs8lbTh8EWf8gxVTUCyRVJSz56iSj1EK4sK9EtOn81g2DLTQ0yYkrRqBb3yO0k0GPeLLdZGCHc3LeS_OZqkuHIjxd4B3t9fUTaStUnSuTuQoP7Jwn4jmbyPGo2Hp6zQr37aBFBB_n1PW9VeKFBdhrx_gcLC1G22NRYfRcGVn0hUJPbmUVxkv-k_Rl95GPr2d3jjqfvwMX3RIqpYtoGHyhCa-6ca36VuoYElHYqppas6UZnrAnCmvjfSMZJW4lPLSTmBy-u3Lt693A",
        },
      ],
    },
  ],
  deletedMails: null,
  draftMails: null,
  importantMails: null,
  scheduledMails: null,
  selfSentMails: null,
  spamMails: null,

  // 메일 그룹 리스트 (받은/보낸 메일)
  groupedMails: [],

  // 상태 및 에러
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  // 선택된 메일
  selectedMail: null, // 선택된 개별 메일  - mailDetail을 보여주기 위함
  selectedGroup: [], // 선택된 메일 그룹(받은사람 묶어보기 정렬) - mailPreview를 위함

  isExpanded: false, // mailDetailMax 확장 여부

  // 메일 리스트 설정 함수
  setReceivedMails: (mails) => set({ receiveMails: mails }),
  setSentMails: (mails) => set({ sentMails: mails }),
  setDeletedMails: (mails) => set({ deletedMails: mails }),
  setDraftMails: (mails) => set({ draftMails: mails }),
  setImportantMails: (mails) => set({ importantMails: mails }),
  setScheduledMails: (mails) => set({ scheduledMails: mails }),
  setSelfSentMails: (mails) => set({ selfSentMails: mails }),
  setSpamMails: (mails) => set({ spamMails: mails }),

  // 그룹화 설정 함수
  setGroupedMails: (mails) =>
    set(() => {
      const groupedMap = mails.reduce((acc, mail) => {
        const key =
          extractEmailAddress(mail.sender) ??
          extractEmailAddress(mail.receiver) ??
          "unknown";
        if (!acc[key]) acc[key] = [];
        acc[key].push(mail);
        return acc;
      }, {});

      const groupedArray = Object.entries(groupedMap)
        .map(([contact, mailItems]) => ({
          sender: contact,
          mailItems: mailItems.sort((a, b) => {
            const dateA = new Date(
              a.receiveAt ?? a.sendAt ?? "1970-01-01"
            ).getTime();
            const dateB = new Date(
              b.receiveAt ?? b.sendAt ?? "1970-01-01"
            ).getTime();
            return dateB - dateA; // 최신 순 정렬
          }),
        }))
        .sort((a, b) => {
          const firstA = a.mailItems[0]; // 최신 메일
          const firstB = b.mailItems[0];

          const dateA = new Date(
            firstA.receiveAt ?? firstA.sendAt ?? "1970-01-01"
          ).getTime();
          const dateB = new Date(
            firstB.receiveAt ?? firstB.sendAt ?? "1970-01-01"
          ).getTime();

          return dateB - dateA; // 최신 순 정렬 (그룹 자체)
        });

      return { groupedMails: groupedArray };
    }),
  setGroupedMailsFromSearch: (emails, senderEmail) =>
    set(() => {
      const sanitizedMails = emails.map((mail) => {
        if (mail.mailType === "received") {
          return { ...mail, receiver: null };
        } else if (mail.mailType === "sent") {
          return { ...mail, sender: null };
        }
        return mail;
      });

      const sortedMails = sanitizedMails.sort((a, b) => {
        const dateA = new Date(
          a.receiveAt ?? a.sendAt ?? a.createdAt ?? "1970-01-01"
        ).getTime();
        const dateB = new Date(
          b.receiveAt ?? b.sendAt ?? b.createdAt ?? "1970-01-01"
        ).getTime();
        return dateB - dateA; // 최신순 정렬
      });

      return {
        groupedMails: [
          {
            sender: senderEmail, // 검색어 이메일
            mailItems: sortedMails,
          },
        ],
      };
    }),

  // 상태 처리
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),

  // 선택된 메일 설정 함수
  setSelectedMail: (mail) => set({ selectedMail: mail ? { ...mail } : null }),

  setSelectedGroup: (mails) =>
    set(() => {
      const updatedMails = mails.map((mail) => ({ ...mail })).reverse();

      return {
        selectedGroup: updatedMails,
      };
    }),

  // mailDetailMax 확장 여부 토글
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  // 선택된 메일, 확장 여부 초기화
  reset: () => set({ selectedMail: null, isExpanded: false }),
}));
