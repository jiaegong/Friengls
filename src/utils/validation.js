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
//유저네임체크(한글,영어,숫자,특수문자(-_.)를 포함한 4-16자)
export const userNameForm = (userName) => {
  let reg = /^[가-힣a-zA-Z0-9-_.]+$/;
  if (reg.test(userName)) {
    let inputLength = 0;
    for (let i = 0; i < userName.length; i++) {
      if (escape(userName.charAt(i)).length === 6) {
        inputLength += 1;
      }
      inputLength += 1;
    }
    if (4 <= inputLength && inputLength <= 16) {
      return true;
    }
  }
};
//글자수체크: limit까지 입력 가능
export const inputLength = (word) => {
  let inputCount = 0;
  for (let i = 0; i < word.length; i++) {
    if (escape(word.charAt(i)).length === 6) {
      inputCount += 1;
    }
    inputCount += 1;
  }
  return inputCount;
};
