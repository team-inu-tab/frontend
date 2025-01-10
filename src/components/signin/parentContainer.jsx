// ParentContainer.js
import styled from 'styled-components';

export const ParentContainer = styled.div`
  display: grid;
  place-items: center; /* 요소를 수직 및 수평 중앙에 배치 */
  width: 100vw;
  height: 100vh;
  position: relative; /* 필요 시 자식 요소의 절대 위치 기준 */
`;

export default ParentContainer