import React, { useEffect } from 'react';
import './App.css';

// 패키지
import { Route, Switch } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

//  컴포넌트
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Kakao from '../pages/Kakao';
import Google from '../pages/Google';
import DetailInfo from '../pages/DetailInfo';
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';
import VideoChat from '../pages/VideoChat';
import Search from '../pages/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCookie } from '../shared/Cookie';
import Portal from '../shared/Portal';
import ReviewModal from '../components/ReviewModal';

function App() {
  const dispatch = useDispatch();
  // 페이지 조회할 때마다 실행, token이 유효한지 여부 체크
  useEffect(() => {
    if (getCookie('token')) {
      dispatch(userActions.loginCheckDB());
    }
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     dispatch(userActions.loginCheckDB());
  //   }
  // }, []);

  const modalOn = useSelector((state) => state.modal.modalOn);
  // console.log(modalOn);

  return (
    <ConnectedRouter history={history}>
      {modalOn && <ReviewModal />}
      <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/auth/kakao" component={Kakao} />
        <Route path="/oauth2/callback/google" component={Google} />
        <Route path="/signup/detail" component={DetailInfo} />
      </Switch>
      <Route path="/" exact component={Main} />
      <Route path="/mypage/:userName/:isTutor" exact component={Mypage} />
      <Route path="/detail/:userName/:isTutor" exact component={Detail} />
      <Route path="/videochat/:roomName" exact component={VideoChat} />
      <Route path="/search" exact component={Search} />
      <Footer />
    </ConnectedRouter>
  );
}

export default App;
