import React, { useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMedium } from '../image';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { actionCreators as likeActions } from '../redux/modules/like';
import { getCookie } from '../shared/Cookie';

const DetailUser = (props) => {
  const dispatch = useDispatch();
  const urlCheck = props.props.match.url;
  // like 누르기, 토큰 같이 보내기, likeList랑 tutor유저 리스트 인덱스랑 비교해서 같으면 넣기
  let isLiked = true; // 테스트차, 서버에서 보내주는 값으로 접속한 유저가 해당 페이지 튜터를 좋아요 했는지 체크하기
  const tutorName = props.userName; // props로 유저 정보 받아서 넣기
  const token = getCookie('token');

  const { detailInfo } = props;
  let tags = detailInfo.tag;
  let [tag1, tag2, tag3] = tags.split(',');

  const like = () => {
    dispatch(likeActions.likeDB(token, tutorName));
  };

  const unlike = () => {
    dispatch(likeActions.unlikeDB(token, tutorName));
  };
  return (
    <div>
      <div>
        {isLiked ? (
          <AiFillHeart onClick={unlike} />
        ) : (
          <AiOutlineHeart onClick={like} />
        )}
        <button
          onClick={() => {
            history.push('/mypage');
          }}
        >
          수정
        </button>
      </div>
      <UserInfoBox>
        <UserImgWrap>
          <img className="userImg" src={detailInfo.userProfile} alt="" />
        </UserImgWrap>
        <div className="userInfo">
          <UserTitle>
            <p className="tutorName">{detailInfo.userName}</p>
            <span>{detailInfo.language1}</span>/
            <span>{detailInfo.language2}</span>/
            <span>{detailInfo.language3}</span>
          </UserTitle>
          <Contests>{detailInfo.comment}</Contests>
          <Tags>
            {tag1 && <span>{tag1}</span>}
            {tag2 && <span>{tag2}</span>}
            {tag3 && <span>{tag3}</span>}
          </Tags>
          <Like>
            <AiOutlineHeart className="likeIcon" />
            {detailInfo.like}
          </Like>
        </div>
      </UserInfoBox>
      {urlCheck ? (
        ''
      ) : (
        <div>
          <button>좋아요</button>
          <button
            onClick={() => {
              history.push('/mypage');
            }}
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};

// const UserInfoBox = styled.div`
//   display: flex;
// `;

// const ImageBox = styled.div`
//   margin: 20px;
//   display: flex;
//   justify-content: center;
//   text-align: center;
//   overflow: hidden;
//   width: 100px;
//   height: 100px;
//   border-radius: 50px;
// `;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
// `;

// const TextInfo = styled.p`
//   margin-top: 10px;
// `;

export default DetailUser;

const UserInfoBox = styled.div`
  width: 100%;
  min-height: 240px;
  display: flex;
  justify-content: space-around;

  .userInfo {
    width: 76%;
    height: 240px;
    position: relative;

    /* background-color: #686868; */
  }
`;

const UserImgWrap = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;

  .userImg {
    /* width: 100%; */
    width: 240px;
    height: 240px;
  }
`;

const UserTitle = styled.div`
  margin-bottom: 20px;

  .tutorName {
    display: inline-block;
    font-size: 34px;
    font-weight: 600;
    margin-right: 90px;
  }

  span {
    display: inline-block;
    margin: 0 5px;
    font-size: 26px;
    color: #5e5e5e;
  }
`;

const Contests = styled.p`
  width: 70%;
  font-size: 30px;
  margin-bottom: 23px;
  line-height: 40px;
`;

const Tags = styled.div`
  span {
    display: inline-block;
    font-size: 26px;
    padding: 12px 22px;
    margin-right: 20px;
    border: 2px solid #959595;
    border-radius: 40px;
    box-shadow: 0px 2px 6px 0px #00000040;
    background-color: #fff;
  }
`;

const Like = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 30px;

  .likeIcon {
    font-size: 32px;
    padding-top: 5px;
    margin-right: 16px;
  }
`;
