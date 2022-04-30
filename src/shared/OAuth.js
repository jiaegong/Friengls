const CLIENT_ID = 'a460e0fb29f8d9d785fbf3641185281b';
const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
