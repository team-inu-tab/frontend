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
  const [affiliation, setAffiliation] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const jobData = { data: ["학생", "직장인"] };

  const hasFetched = useRef(false);
  const navigation = useNavigate();

  const refreshAccessToken = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      const response = await axios.post(
        "https://maeilmail.co.kr/api/oauth2/reissue",
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

  useEffect(() => {
    refreshAccessToken();
  }, []);

  const renderJobText = (value) => {
    setSelectedJob(value);
    if (value === "학생") setSelectedJob("학교");
    else if (value === "직장인") setSelectedJob("회사");
    else setSelectedJob("");
  };
  
  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (selectedJob === "학교") {
        const payload = {
          schoolName: affiliation,
          studentDepartment: department,
          studentNum: Number(position)
        };
        const response = await axios.post(
          "https://maeilmail.co.kr/api/users/info/student",
          payload,
          { withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
           }
        );
        console.log("학교 정보 저장 완료:", response.data);
      } else if (selectedJob === "회사") {
        const payload = {
          company: affiliation,
          workerDepartment: department,
          position: position
        };
        const response = await axios.post(
          "https://maeilmail.co.kr/api/users/info/worker",
          payload,
          { withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
           }
        );
        console.log("회사 정보 저장 완료:", response.data);
      }
      navigation("/mail");
    } catch (error) {
      console.error("정보 전송 실패:", error);
    }
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
        { selectedJob && <input className="affiliationInput" 
                              value={affiliation}
                              onChange={(e) => setAffiliation(e.target.value)}></input> }

        { selectedJob === "학교" && (
          <span className="departmentPlaceHolder">학과</span>) }
        { selectedJob === "회사" && (
          <span className="departmentPlaceHolder">부서</span>) }

        { selectedJob && <img src={InputLine} className="inputLine2"></img> }

        { selectedJob && <input className="departmentInput" 
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}></input> }
        
        { selectedJob === "학교" && (
          <span className="positionPlaceHolder">학번</span>) }
        { selectedJob === "회사" && (
          <span className="positionPlaceHolder">직책</span>) }

        { selectedJob && <input className="positionInput" 
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}></input> }

        <CompleteButton
          className="addInfoCompleteButton"
          text="입력완료"
          onClick={ handleSubmit }
        ></CompleteButton>
      </Circle>
    </Container>
  );
}

export default Signin;
