//유저네임체크(한글,영어,숫자,특수문자(-_.)를 포함한 4-16자)
export const countInput = (input) => {
  let reg = /^[가-힣a-zA-Z0-9-_.]{1,16}$/;
  if (reg.test(input)) {
    let inputLength = 0;
    for (let i = 0; i < input.length; i++) {
      if (escape(input.charAt(i)).length === 6) {
        inputLength += 1;
      }
      inputLength += 1;
    }
    if (6 <= inputLength && inputLength <= 16) {
      return true;
    }
  }
};

//
