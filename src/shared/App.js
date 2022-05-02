import React from 'react';
import './App.css';

// 패키지
import { Route } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';

//  컴포넌트
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Mypage from '../pages/Mypage';
import Detail from '../pages/Detail';
import VideoChat from '../pages/VideoChat';
import Search from '../pages/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewModal from '../components/ReviewModal';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Route path="/" exact component={Main} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/detail" exact component={Detail} />
      <Route path="/videochat/:roomName" exact component={VideoChat} />
      <Route path="/search" exact component={Search} />
      <Route path="/reviewmodal" exact component={ReviewModal} />
      <Footer />
    </ConnectedRouter>
  );
}

export default App;
