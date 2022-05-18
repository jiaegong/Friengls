import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { history } from '../redux/configureStore';
import { Flex, Text, Input, Button } from '../elements/index';
import { ProfileMedium } from '../image';

const Mypage = () => {
  const dispatch = useDispatch();
  // 마이페이지 예약정보 불러오기 위한 값들
  const userInfo = useSelector((state) => state.user.info);
  const isTutor = useSelector((state) => state.user.info.isTutor);
  const userName = useSelector((state) => state.user.info.userName);
  console.log({ isTutor, userName });

  //  불러온 예약 정보
  const bookingList = useSelector((state) => state.booking.list);
  console.log(bookingList);

  useEffect(() => {
    dispatch(bookingAction.getBookingDB({ isTutor, userName }));
  }, [userName]);

  const videoChatHandler = (roomName) => {
    // const roomid = Tutor_userName+Tutee_userName;
    // history.push(`/videochat/${roomid}`);
  };

  //마이페이지 유저정보
  console.log(userInfo);

  return (
    // <>
    //   {/* 예약리스트 맵 돌리기 */}
    //   <Flex styles={{ border: '1px solid black', width: '300px' }}>
    //     <Flex styles={{ justifyContent: 'flex-start' }}>
    //       <Text>선생님 이름</Text>
    //       <Text>시간</Text>
    //     </Flex>
    //     <Button onClick={videoChatHandler}>Video Call</Button>
    //   </Flex>
    // </>
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <div className="userInfoWrap">
          <div>
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
            <UserInfoBox>
              <ImageBox>
                <Image src={ProfileMedium} />
              </ImageBox>
              <div>
                <TextInfo>
                  <span>닉네임</span>: <span>닉네임불러오기</span>
                </TextInfo>
                <TextInfo>
                  <span>한 줄 소개</span>: <span>닉네임불러오기</span>
                </TextInfo>
                <TextInfo>
                  <span>태그</span>: <span>태그불러오기</span>
                </TextInfo>
                <TextInfo>
                  <span>구사 가능 언어</span>: <span>언어불러오기</span>
                </TextInfo>
              </div>
            </UserInfoBox>
            <div>
              <h2>자기소개</h2>
              <TextInfo>자기소개 불러오기</TextInfo>
            </div>
          </div>
        </div>
        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <p className="bookingTitle">
            예약 리스트 <span>/ 수업 일정</span>
          </p>
          <ul className="bookingList">
            {bookingList?.map((item, idx) => {
              let startTime = item.start;
              let endTime = item.end;

              if (!item) return; // 이 부분 불확실...
              let [week, month, day, year, sTime] = startTime.split(' ');
              let start = sTime.substr(0, 5);
              let end = endTime.substr(-17, 5);
              return (
                <li className="booking" key={`booking${idx}`}>
                  <div className="bookingInfo">
                    {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
                    {isTutor === 0 ? (
                      <div className="userName">{item.Tutor_userName}</div>
                    ) : (
                      <div className="userName">{item.Tutee_userName}</div>
                    )}
                    <div className="userBookingWrap">
                      <span>
                        {week} {month} {day} {year} &emsp;
                      </span>
                      <span>
                        {start}&emsp; ~ &emsp;{end}
                      </span>
                    </div>
                  </div>
                  {/* <List> */}
                  <button className="videoBtn" onClick={videoChatHandler}>
                    수업 시작
                  </button>
                  {/* </List> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Wrap>
  );
};

export default Mypage;

const Wrap = styled.div`
  width: 100%;
  min-height: 904px;
  background-color: #ddd;

  .innerWrap {
    max-width: 1400px;
    width: 90%;
    margin: auto;

    /* 유저정보 wrap */
    .userInfoWrap {
      width: 95%;
      min-height: 300px;
      margin: 30px auto 0;

      background-color: #aaa;

      /* 유저 정보 */
      .userInfo {
        width: 100%;
        height: 300px;

        background-color: #686868;
      }
    }

    /* 예약 리스트 Wrap */
    .bookingWrap {
      width: 100%;
      max-width: 1400px;
      height: auto;
      margin-top: 30px;
      margin: 30px auto;
      min-height: 100px;
      padding: 10px;

      /* background-color: #0076ed; */

      /* 예약 리스트 타이틀 */
      .bookingTitle {
        font-size: 60px;
        font-weight: bolder;
        margin-bottom: 60px;

        span {
          font-size: 40px;
          color: #969696;
          margin-left: 15px;
        }
      }

      /* 예약 리스트 */

      .bookingList {
        max-height: 520px;
        min-height: 300px;
        /* display: flex; */
        /* justify-content: center; */
        /* flex-direction: column; */
        /* align-items: center; */
        border: 2px solid #c7c7c7;
        border-radius: 4px;
        /* padding: 40px 60px 40px 40px; */
        padding: 40px 30px 40px 40px;
        box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.15);
        overflow-y: scroll;

        background: #fff;

        /* 스크롤 버튼 조절 */
        ::-webkit-scrollbar {
          width: 20px; /*스크롤바의 너비*/
        }
        ::-webkit-scrollbar-thumb {
          height: 20%;
          background-color: #e4e4e4; /*스크롤바의 색상*/
          border-radius: 15px;
          /* display: none; */
        }
        ::-webkit-scrollbar-track {
          background-color: #d7d7d7;
          border-radius: 15px;
          display: none;
          /*스크롤바 트랙 색상 */
        }

        /* 예약 카드 */
        .booking {
          width: 100%;
          max-width: 1300px;
          min-height: 50px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          /* background-color: #fff; */

          + .booking {
            margin-top: 10px;
          }

          /* 예약 정보 */
          .bookingInfo {
            width: 80%;
            height: 80px;
            padding: 10px;
            display: flex;
            /* justify-content: space-between; */
            justify-content: space-around;
            text-align: center;
            border: 2px solid #c7c7c7;
            border-radius: 4px;
            margin-right: 20px;

            /* background-color: #f30b0b; */

            .userName {
              width: 20%;
              font-size: 28px;
              display: flex;
              align-items: center;
              justify-content: center;

              /* background-color: #aaaaaa; */
            }

            .userBookingWrap {
              width: 70%;
              text-align: left;
              display: flex;
              align-items: center;
              justify-content: space-around;

              span {
                display: inline-block;
                font-size: 24px;
              }
              /* background-color: #aaaaaa; */
            }

            /* background: #eee; */
          }

          .videoBtn {
            width: 20%;
            max-width: 240px;
            height: 80px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 24px;
            font-weight: bolder;
            color: #fff;
            cursor: pointer;

            background-color: #153587;
            /* background-color: #c1c1c1; */
          }
        }
      }
    }
  }
`;
const UserInfoBox = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const TextInfo = styled.p`
  margin-top: 10px;
`;
