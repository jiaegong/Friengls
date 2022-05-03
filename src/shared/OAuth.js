//카카오로그인 인증요청
const KAKAO_CLIENT_ID = 'a460e0fb29f8d9d785fbf3641185281b';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

//구글로그인 인증요청
const GOOGLE_CLIENT_ID =
  '1075426396738-at85n9h52ona9er8emtebrk9hsnd8l9v.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/oauth2/callback/google';
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email&response_type=code`;
