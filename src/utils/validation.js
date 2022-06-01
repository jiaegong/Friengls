//이메일: abc@abc.abc형식의 이메일
export const emailForm = (userEmail) => {
  let reg = /^[A-Za-z0-9-_.]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(userEmail);
};
//비밀번호: 8-20자 사이의 영어대소문자, 숫자, 특수문자 혼합
export const pwdForm = (pwd) => {
  let reg = /^(?=.*[A-Za-z])(?=.*[0-9])[a-zA-Z0-9!-_]{8,20}$/;
  return reg.test(pwd);
};
//닉네임: 영문, 숫자, 특수문자(- _ .) 4-20이하 or 한글 2-8자, 숫자, 특수문자(- _ .)
export const userNameForm = (userName) => {
  let reg = /^[a-zA-Z0-9-_.]{6,20}|[ㄱ-힣0-9-_.]{2,8}$/;
  return reg.test(userName);
};
//태그: 한글, 영문, 숫자만 입력가능(개선필요)
export const checkSpelling = (spelling) => {
  let reg = /^[a-zA-Z0-9]{0,16}|[ㄱ-힣0-9]{0,8}$/;
  return reg.test(spelling);
};
