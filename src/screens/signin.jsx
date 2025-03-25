import { useEffect, useState } from "react";
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
import { useMailApi } from "@hooks/useMailApi.js";

function Signin() {
  const [affiliation, setAffiliation] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const jobData = { data: ["학생", "직장인"] };

  const BASE_URL = "https://maeilmail.co.kr/api";
  const navigation = useNavigate();
  const { getToken } = useMailApi();

  const refresh = () => {
    fetch(`${BASE_URL}/oauth2/reissue`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        const accessToken = res.headers.get("Authorization");
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
        }
      } else {
        alert("토큰 저장 실패");
      }
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const renderJobText = (value) => {
    setSelectedJob(value);
    if (value === "학생") setSelectedJob("학교");
    else if (value === "직장인") setSelectedJob("회사");
    else setSelectedJob("");
  };

  const handleSubmit = async () => {
    try {
      const accessToken = getToken();

      if (selectedJob === "학교") {
        const payload = {
          schoolName: affiliation,
          studentDepartment: department,
          studentNum: Number(position),
        };
        const response = await axios.post(
          "https://maeilmail.co.kr/api/users/info/student",
          payload,
          {
            withCredentials: true,
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log("학교 정보 저장 완료:", response.data);
      } else if (selectedJob === "회사") {
        const payload = {
          company: affiliation,
          workerDepartment: department,
          position: position,
        };
        const response = await axios.post(
          "https://maeilmail.co.kr/api/users/info/worker",
          payload,
          {
            withCredentials: true,
            headers: {
              Authorization: accessToken,
            },
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
        {selectedJob && (
          <input
            className="affiliationInput"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          ></input>
        )}

        {selectedJob === "학교" && (
          <span className="departmentPlaceHolder">학과</span>
        )}
        {selectedJob === "회사" && (
          <span className="departmentPlaceHolder">부서</span>
        )}

        {selectedJob && <img src={InputLine} className="inputLine2"></img>}

        {selectedJob && (
          <input
            className="departmentInput"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          ></input>
        )}

        {selectedJob === "학교" && (
          <span className="positionPlaceHolder">학번</span>
        )}
        {selectedJob === "회사" && (
          <span className="positionPlaceHolder">직책</span>
        )}

        {selectedJob && (
          <input
            className="positionInput"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          ></input>
        )}

        <CompleteButton
          className="addInfoCompleteButton"
          text="입력완료"
          onClick={handleSubmit}
        ></CompleteButton>
      </Circle>
    </Container>
  );
}

export default Signin;
