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
  const isTutor = useSelector((state) => state.user.info.isTutor);
  const userName = useSelector((state) => state.user.info.userName);
  console.log({ isTutor, userName });

  //  불러온 예약 정보
  const bookingList = useSelector((state) => state.booking.list);
  console.log(bookingList);

  useEffect(() => {
    dispatch(bookingAction.getBookingDB({ isTutor, userName }));
  }, []);

  const videoChatHandler = (roomName) => {
    // const roomid = Tutor_userName+Tutee_userName;
    // history.push(`/videochat/${roomid}`);
  };

  //마이페이지 유저정보
  const userInfo = useSelector((state) => state.user.info);
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
          <p className="bookingTitle">예약 리스트</p>
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
                    <div className="userBooking">
                      {week} {month} {day} {year} &emsp; {start} ~ {end}
                    </div>
                  </div>
                  {/* <List> */}
                  <button className="videoBtn" onClick={videoChatHandler}>
                    채팅하기
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
      width: 80%;
      max-width: 1000px;
      height: auto;
      margin-top: 30px;
      margin: 30px auto;
      min-height: 100px;
      padding: 10px;

      background-color: #686868;

      /* 예약 리스트 타이틀 */
      .bookingTitle {
      }

      /* 예약 리스트 */
      .bookingList {
        min-height: 100px;
        margin-top: 10px;
        padding: 10px;

        background: #a9a9a9;

        /* 예약 카드 */
        .booking {
          width: 100%;
          min-height: 50px;
          border-radius: 10px;
          display: flex;
          justify-content: space-around;
          /* justify-content: center; */
          align-items: center;

          background-color: #fff;

          + .booking {
            margin-top: 10px;
          }

          /* 예약 정보 */
          .bookingInfo {
            width: 75%;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            text-align: center;

            .userName {
              width: 20%;
            }

            .userBooking {
              width: 70%;
              text-align: left;
            }

            background: #eee;
          }

          .videoBtn {
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            cursor: pointer;

            background-color: #c1c1c1;
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
