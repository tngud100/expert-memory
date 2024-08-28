import { jwtDecode } from 'jwt-decode';

const getTokenData = () => {
  const getUserIdFromToken = () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        // 토큰을 디코딩하여 payload 추출
        const decoded = jwtDecode(token);
        // 여기서 비밀 키를 사용하는 부분을 생략하거나 필요 시 다른 방식으로 사용
        return decoded.userId; // payload에서 추출
      } catch (err) {
        console.error('Invalid token', err);
        return null;
      }
    } else {
      return null;
    }
  };

  const getRoleFromToken = () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        // 토큰을 디코딩하여 payload 추출
        const decoded = jwtDecode(token);
        // 여기서 비밀 키를 사용하는 부분을 생략하거나 필요 시 다른 방식으로 사용
        return decoded.role; // payload에서 추출
      } catch (err) {
        console.error('Invalid token', err);
        return null;
      }
    } else {
      return null;
    }
  }

  return {
    getUserIdFromToken,
    getRoleFromToken
  };
};

export default getTokenData;