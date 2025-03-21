import React, { useState, useRef } from 'react';

const LoginTest = () => {
  const [accessToken, setAccessToken] = useState("");
  const [emailId, setEmailId] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const getDraftEmails = async () => {
    try {
      const response = await fetch('https://likelionfesival.shop/mails/draft', {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('임시 메일 수신 성공(콘솔에 데이터 확인)');
        const data = await response.json();
        console.log(data);
      } else {
        alert('임시 메일 수신 실패');
      }
    } catch (error) {
      alert("임시 메일 수신 중 오류 발생");
    }
  };

  const getScheduledEmails = async () => {
    try {
      const response = await fetch('https://likelionfesival.shop/mails/schedule', {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('예약 메일 수신 성공(콘솔에 데이터 확인)');
        const data = await response.json();
        console.log(data);
      } else {
        alert('예약 메일 수신 실패');
      }
    } catch (error) {
      alert("예약 메일 수신 중 오류 발생");
    }
  };

  const getImportantEmails = async () => {
    try {
      const response = await fetch('https://likelionfesival.shop/mails/important', {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('중요 메일 수신 성공(콘솔에 데이터 확인)');
        const data = await response.json();
        console.log(data);
      } else {
        alert('중요 메일 수신 실패');
      }
    } catch (error) {
      alert("중요 메일 수신 중 오류 발생");
    }
  };

  const getSelfEmails = async () => {
    try {
      const response = await fetch('https://likelionfesival.shop/mails/self', {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('내게 보낸 메일 수신 성공(콘솔에 데이터 확인)');
        const data = await response.json();
        console.log(data);
      } else {
        alert('내게 보낸 메일 수신 실패');
      }
    } catch (error) {
      alert("내게 보낸 메일 수신 중 오류 발생");
    }
  };

  const getReceivedEmails = async () => {
    try {
      const response = await fetch('http://localhost:8080/mails/receive', {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('받은 메일 수신 성공(콘솔에 데이터 확인)');
        const data = await response.json();
        console.log(data);
      } else {
        alert('받은 메일 수신 실패');
      }
    } catch (error) {
      alert("받은 메일 수신 중 오류 발생");
    }
  };

  const getSentEmails = async () => {
    try {
      const response = await fetch('https://likelionfesival.shop/mails/send', {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('보낸 메일 수신 성공(콘솔에 데이터 확인)');
        const data = await response.json();
        console.log(data);
      } else {
        alert('보낸 메일 수신 실패');
      }
    } catch (error) {
      alert("보낸 메일 수신 중 오류 발생");
    }
  };

  const getFile = async () => {
    try {
      const response = await fetch(`https://likelionfesival.shop/mails/${emailId}/file/${fileName}`, {
        method: "GET",
        credentials: "include",
        headers: { Authorization: accessToken }
      });
      if (response.ok) {
        alert('파일 수신 성공');
      } else {
        alert('파일 수신 실패');
      }
    } catch (error) {
      alert("파일 수신 중 오류 발생");
    }
  };

  const storeFile = async () => {
    if (!fileInputRef.current || fileInputRef.current.files.length === 0) {
      alert('파일을 선택해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);

    try {
      const response = await fetch('https://likelionfesival.shop/fileUploadSample', {
        method: 'POST',
        credentials: "include",
        headers: { Authorization: accessToken },
        body: formData,
      });
      if (response.ok) {
        alert('파일 업로드 성공');
      } else {
        alert('파일 업로드 실패');
      }
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
      alert('파일 업로드 중 오류 발생');
    }
  };

  const getHello = () => {
    fetch("https://likelionfesival.shop/hello", {
      method: "GET",
      credentials: "include",
      headers: { Authorization: accessToken },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert(JSON.stringify(data));
      });
  };

  const refresh = async () => {
    try {
      const res = await fetch("https://likelionfesival.shop/oauth2/reissue", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        const token = res.headers.get("Authorization");
        if (token && token.startsWith("Bearer ")) {
          setAccessToken(token.slice(7)); // "Bearer " 제거 후 저장
          alert("refresh done!");
        } else {
          alert("토큰 형식이 잘못됨");
        }
      } else {
        alert("refresh fail..");
      }
    } catch (err) {
      alert("refresh 중 오류 발생");
      console.error(err);
    }
  };

  const storeUserInfo = () => {
    fetch("https://likelionfesival.shop/users/info/student", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentDepartment: "컴퓨터공학부",
        studentNum: 201901630
      })
    })
      .then(res => {
        if (res.status === 200) {
          alert('save success!');
        } else {
          alert('save fail...');
        }
      })
      .catch(error => alert(error));
  };

  const storeWorkerInfo = () => {
    fetch("https://likelionfesival.shop/users/info/worker", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: "카카오",
        workerDepartment: "개발",
        position: "대리"
      })
    })
      .then(res => {
        if (res.status === 200) {
          alert('save success!');
        } else {
          alert('save fail...');
        }
      });
  };

  const logout = () => {
    fetch("https://likelionfesival.shop/oauth2/logout", {
      method: "POST",
      credentials: "include",
      headers: { Authorization: accessToken }
    })
      .then(res => {
        if (res.status === 200) {
          alert("logout success!");
          window.location.href = "https://maeilmail.co.kr/testLoginPage.html";
        }
      });
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('https://likelionfesival.shop/mails/send', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // <- Bearer 꼭 붙이기
        },
        body: JSON.stringify({
          toEmail,
          subject,
          body,
        }),
      });
  
      if (response.ok) {
        alert('메일 전송 성공!');
        setToEmail("");
        setSubject("");
        setBody("");
      } else {
        alert('메일 전송 실패');
      }
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      alert("메일 전송 중 오류 발생");
    }
  };

  return (
    <div>
      <h1>login Success</h1>
      <h5>로그인 성공 후 refresh 필수!!</h5>
      <button onClick={getHello}>get hello</button>
      <button onClick={refresh} style={{ color: 'orange' }}>refresh</button>
      <button onClick={logout} style={{ color: 'red' }}>logout</button>

      <h3>개인 정보 저장 API</h3>
      <button onClick={storeUserInfo}>store student info</button>
      <button onClick={storeWorkerInfo}>store worker info</button>

      <h3>메일 조회 API</h3>
      <button onClick={getReceivedEmails}>get received emails</button>
      <button onClick={getSentEmails}>get sent emails</button>
      <button onClick={getSelfEmails}>get self emails</button>
      <button onClick={getImportantEmails}>get important emails</button>
      <button onClick={getScheduledEmails}>get scheduled emails</button>
      <button onClick={getDraftEmails}>get draft emails</button>

      <h3>파일 관련 API</h3>
      <div>
        <h5>파일 저장 테스트 API(파일 저장 이메일 id는 1로 놓음)</h5>
        <input type="file" ref={fileInputRef} />
        <button onClick={storeFile}>submit</button>
      </div>
      <br />
      <div>
        <h5>파일 조회 API</h5>
        <input
          type="number"
          placeholder="이메일 id"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          type="text"
          placeholder="파일 이름"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button onClick={getFile}>get file</button>
      </div>
      <br />
      <h3>메일 보내기</h3>
      <div>
        <h5>메일 보내기</h5>
        <input
          type="email"
          placeholder="받는 사람 이메일"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="제목"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="이메일 내용"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={sendEmail}>메일 보내기</button>
      </div>
    </div>
  );
};

export default LoginTest;