import styled from 'styled-components'

export const Circle = styled.div`
  position: relative;
  margin-top: 10%;
  margin-left: 35%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.196);
  display: flex;
  justify-content: center;
  align-items: center;

  /* Linear Gradient Stroke */
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    opacity: 60%;
    background: linear-gradient(120deg, #9590d5, #7facee);
    z-index: -1;
  }
`;

export default Circle;