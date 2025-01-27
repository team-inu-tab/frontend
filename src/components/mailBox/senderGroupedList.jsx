import "@components/mailBox/css/senderGroupedList.css";

const SenderGroupedList = ({ Mails }) => {
  return (
    <div className="senderGroupedList-wrapper">
      {Mails.map((group, index) => (
        <SenderGroupedList
          key={index}
          sender={group.sender}
          mailItems={group.mailItems}
        />
      ))}
    </div>
  );
};

export default SenderGroupedList;
