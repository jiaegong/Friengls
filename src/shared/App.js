import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

//  컴포넌트
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SocialLogin from '../pages/SocialLogin';
import DetailInfo from '../pages/DetailInfo';
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';
import VideoChat from '../pages/VideoChat';
import Search from '../pages/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCookie } from '../shared/Cookie';
import FeedBackModal from '../components/FeedBackModal';
import Tutorial from '../pages/Tutorial';

function App() {
  const dispatch = useDispatch();
  // 페이지 조회할 때마다 실행, token이 유효한지 여부 체크
  useEffect(() => {
    if (getCookie('token')) {
      dispatch(userActions.loginCheckDB());
    }
  }, []);

  // 콘솔 창 배포환경에서 안보이기
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
  }

  return (
    <ConnectedRouter history={history}>
      <Header />
      <Route path="/" exact component={Main} />
      <Route path="/tutorial" exact component={Tutorial} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/kakaoUser" component={SocialLogin} />
      <Route path="/googleUser" component={SocialLogin} />
      <Route path="/signup/detail" component={DetailInfo} />
      <Route path="/mypage/:userName/:isTutor" exact component={Mypage} />
      <Route path="/detail/:userName/:isTutor" exact component={Detail} />
      <Route path="/videochat/:roomName" exact component={VideoChat} />
      <Route path="/search" exact component={Search} />
      <Route path="/search/:tag" exact component={Search} />
      <Footer />
      <FeedBackModal />
    </ConnectedRouter>
  );
}

export default App;
