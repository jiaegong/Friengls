export const emailForm = (email) => {
  let reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
  //이메일 [0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i
  //비밀번호
  return reg.test(email);
};

export const pwdForm = (pwd) => {
  let reg = /^(?=.*[A-Za-z])(?=.*\d)[\w]{8,20}$/;
  return reg.test(pwd);
};
