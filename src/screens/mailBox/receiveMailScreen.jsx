import SenderGroupedList from "../../components/mailBox/senderGroupedList";

// test
const groupedMails = [
  {
    sender: "John Doe",
    mailItems: [
      {
        id: "1",
        hasAttachment: true,
        sender: "John Doe",
        subject: "Meeting Reminder",
        timestamp: "2025-01-22 10:00",
        isChecked: false,
        onCheck: (checked) => console.log("Mail 1 checked:", checked),
      },
      {
        id: "2",
        hasAttachment: false,
        sender: "John Doe",
        subject: "Project Update",
        timestamp: "2025-01-22 11:00",
        isChecked: false,
        onCheck: (checked) => console.log("Mail 2 checked:", checked),
      },
    ],
  },
  {
    sender: "Jane Smith",
    mailItems: [
      {
        id: "3",
        hasAttachment: true,
        sender: "Jane Smith",
        subject: "Budget Report",
        timestamp: "2025-01-21 09:00",
        isChecked: false,
        onCheck: (checked) => console.log("Mail 3 checked:", checked),
      },
    ],
  },
  {
    sender: "Alice Brown",
    mailItems: [
      {
        id: "4",
        hasAttachment: false,
        sender: "Alice Brown",
        subject: "Weekly Newsletter",
        timestamp: "2025-01-20 14:30",
        isChecked: false,
        onCheck: (checked) => console.log("Mail 4 checked:", checked),
      },
      {
        id: "5",
        hasAttachment: true,
        sender: "Alice Brown",
        subject: "New Opportunities",
        timestamp: "2025-01-20 16:00",
        isChecked: false,
        onCheck: (checked) => console.log("Mail 5 checked:", checked),
      },
    ],
  },
];

const ReceiveMailScreen = () => {
  return <SenderGroupedList groupedMails={groupedMails} />;
};

export default ReceiveMailScreen;
