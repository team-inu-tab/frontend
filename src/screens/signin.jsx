import { useState } from "react";
import "@css/signin.css";
import symbolLogo from "@assets/images/symbolLogo.svg";
import Circle from "@components/signin/circle.jsx";
import Container from "@components/signin/parentContainer.jsx";
import CompleteButton from "@components/signin/completeButton.jsx";
import InputLine from "@assets/images/inputLine.svg";
import backGround from "@assets/images/backGround.svg";
import { useNavigate } from "react-router-dom";
import { useMailApi } from "@hooks/useMailApi.js";
import { api } from "@hooks/useMailApi";
import { use } from "react";

function Signin() {
  const [affiliation, setAffiliation] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [studentName, setStudentName] = useState("");

  const navigation = useNavigate();
  const { getToken } = useMailApi();

  const handleSubmit = async () => {
    try {
      await getToken();
      const payload = {
        studentName: studentName,
        schoolName: affiliation,
        studentDepartment: department,
        studentNum: Number(position),
      };
      const res = await api.post("/users/info/student", payload);
      console.log("학교 정보 저장 완료:", res.data);
      navigation("/mail/receive");
    } 
    catch (error) {
      console.error("정보 전송 실패:", error);
    }
  };

  const isFormComplete =
    studentName.trim() !== "" &&
    affiliation.trim() !== "" &&
    department.trim() !== "" &&
    position.trim() !== "";

  return (
    <Container>
      <img src={backGround} className="backGround" />
      <Circle className="formContainer">
        <img src={symbolLogo} className="symbolLogo" />
        <span className="jobPlaceHolder">이름</span>
        <input
          className="nameInput"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        ></input>
        <img src={InputLine} className="inputLine1"></img>

        <span className="jobText">학교</span>
        <input
          className="affiliationInput"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        ></input>

        <span className="departmentPlaceHolder">학과</span>
        <img src={InputLine} className="inputLine2"></img>

        <input
          className="departmentInput"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        ></input>

        <span className="positionPlaceHolder">학번</span>
        <input
            className="positionInput"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
        ></input>

        <CompleteButton
          className="addInfoCompleteButton"
          text="입력완료"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        ></CompleteButton>
      </Circle>
    </Container>
  );
}

export default Signin;