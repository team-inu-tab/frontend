import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "@css/signin.css";
import symbolLogo from "@assets/images/symbolLogo.svg";
import Circle from "@components/signin/circle.jsx";
import Container from "@components/signin/parentContainer.jsx";
import CompleteButton from "@components/signin/completeButton.jsx";
import DropDown from "@components/signin/dropDown.jsx";
import InputLine from "@assets/images/inputLine.svg";
import backGround from "@assets/images/backGround.svg";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [selectedJob, setSelectedJob] = useState("");
  const jobData = { data: ["학생", "직장인"] };

  const hasFetched = useRef(false);
  const navigation = useNavigate();

  const refreshAccessToken = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      const response = await axios.post(
        "https://likelionfesival.shop/oauth2/reissue",
        {},
        { withCredentials: true }
      );

      const accessToken = response.headers["Authorization"];
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        console.log("새로운 액세스 토큰 저장 완료:", accessToken);
      } else {
        console.error("액세스 토큰을 찾을 수 없음!");
      }
    } catch (error) {
      console.error("액세스 토큰 갱신 실패:", error);
    }
  };

  // 페이지 로드 시 리프레쉬 API 호출
  useEffect(() => {
    refreshAccessToken();
  }, []);

  const renderJobText = (value) => {
    setSelectedJob(value);
    if (value === "학생") setSelectedJob("학교");
    else if (value === "직장인") setSelectedJob("회사");
    else setSelectedJob("");
  };

  return (
    <Container>
      <img src={backGround} className="backGround" />
      <Circle className="formContainer">
        <img src={symbolLogo} className="symbolLogo" />
        <span className="jobPlaceHolder">직업</span>
        <img src={InputLine} className="inputLine1"></img>
        <DropDown props={jobData} onSelect={renderJobText} />
        <span className="jobText">{selectedJob}</span>
        {selectedJob && <input className="affiliationInput"></input>}
        {selectedJob === "학교" && (
          <span className="departmentPlaceHolder">학과</span>
        )}
        {selectedJob === "회사" && (
          <span className="departmentPlaceHolder">부서</span>
        )}
        {selectedJob && <img src={InputLine} className="inputLine2"></img>}
        {selectedJob === "학교" && <input className="departmentInput"></input>}
        {selectedJob === "회사" && <input className="departmentInput"></input>}
        {selectedJob === "학교" && (
          <span className="positionPlaceHolder">학번</span>
        )}
        {selectedJob === "회사" && (
          <span className="positionPlaceHolder">직책</span>
        )}
        {selectedJob === "학교" && <input className="positionInput"></input>}
        {selectedJob === "회사" && <input className="positionInput"></input>}
        <CompleteButton
          className="addInfoCompleteButton"
          text="입력완료"
          onClick={() => navigation("/mail")}
        ></CompleteButton>
      </Circle>
    </Container>
  );
}

export default Signin;
