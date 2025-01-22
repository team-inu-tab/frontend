import styled from 'styled-components';

export const Circle = styled.div`
  width: 30vw; /* 뷰포트 너비의 30% */
  height: 30vw; /* 뷰포트 너비의 30% */
  max-width: 600px;
  max-height: 600px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.196);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* ::before 의 위치 기준 */

  /* Linear Gradient Stroke */
  &::before {
    content: '';
    position: absolute;
    top: -0.8vw; /* 뷰포트 단위를 사용하여 크기 조정 */
    left: -0.8vw;
    right: -0.8vw;
    bottom: -0.8vw;
    border-radius: 50%;
    opacity: 0.6;
    background: linear-gradient(120deg, #9590d5, #7facee);
    z-index: -1;
    max-width: 630px; /* 원래 크기 + 3vw (예: 600px + 30px) */
    max-height: 630px;
    min-width: 170px; /* 원래 최소 크기 - 30px */
    min-height: 170px;
  }

  @media (max-width: 768px) {
    width: 40vw;
    height: 40vw;
    
    &::before {
      top: -2vw;
      left: -2vw;
      right: -2vw;
      bottom: -2vw;
    }
  }

  @media (max-width: 576px) {
    width: 50vw;
    height: 50vw;

    &::before {
      top: -2.5vw;
      left: -2.5vw;
      right: -2.5vw;
      bottom: -2.5vw;
    }
  }
`;

export default Circle;
