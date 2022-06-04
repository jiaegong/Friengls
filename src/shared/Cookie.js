//쿠키에서 밸류를 받아오는 함수
const getCookie = (name) => {
  let value = '; ' + document.cookie;
  // 쿠키에 저장된 정보를 받아온다.
  let parts = value.split(`; ${name}=`);
  // (; user_id=) 를 기준으로 쿠키문자열을 자른다. 결과는 [aa=xx, aaa;~문자열]
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  //if로 불러올 데이터가 있는지 확인한다. parts는 배열, 배열 길이가 2가 아니다=쿠키데이터가 없다.
  // 데이터가 있다면 (parts배열길이가 2라면)
};

const setCookie = (name, value, exp = 5) => {
  // exp=5 ? 인수로 exp를 받아오지 않으면 기본값을 5로 지정할 수 있음
  // login.js에서 받아온 값 console.log(name, value, exp + "setCookie값");
  let date = new Date();
  // 오늘을 불러온다 console.log(date + "오늘");
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 설정한 exp만큼(유효기간) 오늘에서 더한다. console.log(date + "3일 뒤");
  document.cookie = `${name}=${value}; expires=${date.toUTCString()};path=/`;
  // 쿠키에 추가한다.
};

const deleteCookie = (name) => {
  let date = new Date('2020-01-01').toUTCString();
  document.cookie = name + '=; expires=' + date;
};

export { getCookie, setCookie, deleteCookie };
