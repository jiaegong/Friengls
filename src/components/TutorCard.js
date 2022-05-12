import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const TutorCard = ({ item, urlCheck }) => {
  return (
    <Card
      className="card"
      onClick={() => {
        history.push(`/detail/${item.userName}/1`);
      }}
    >
      <img
        className="user_img"
        // src={item.userProfile}
        src={'https://via.placeholder.com/300x200'}
        alt="#"
      ></img>
      <div className="user_info">
        <p className="userName">{item.userName}</p>
        {urlCheck ? <p>search</p> : <p>main</p>}
        <p className="userContents">{item.contents}</p>
        {/* <p className="userTag">{item.tag}</p> */}
      </div>
    </Card>
  );
};

export default TutorCard;

const Card = styled.div`
  width: 300px;
  height: 200px;
  overflow: hidden;
  position: relative;

  /* border-radius: 10px; */
  background: #c4c4c4;

  .user_img {
    width: 100%;
    /* height: 100%; */

    background: #aaa;
  }

  .user_info {
    height: 60px;
    padding: 7px 20px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;

    .userName {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 2px;
    }

    .userContents {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1px;
    }
  }
`;
