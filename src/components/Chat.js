import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import io from 'socket.io-client';

const Chat = ({ socket, roomId, userId }) => {
  // const socket = io('https://hjg521.link/', { transports: ['websocket'] });

  const [currentMessage, setCurrentMessage] = useState();
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (currentMessage !== '') {
      const messageData = {
        room: roomId,
        author: userId,
        message: currentMessage,
      };
      socket.emit('send_message', messageData);
      console.log(messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('여기');
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Wrap>
      {messageList.map((message, idx) => {
        return (
          <MessageWrap
            key={idx}
            className="message"
            id={userId === message.author ? 'me' : 'user'}
          >
            {message.message}
          </MessageWrap>
        );
      })}
      <SendWrap>
        <textarea
          className="textarea"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyDown={(e) => {
            e.key === 'Enter' && sendMessage();
          }}
        />
        <button
          className="send"
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </SendWrap>
    </Wrap>
  );
};

export default Chat;

const Wrap = styled.div`
  background-color: transparent;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  position: relative;
`;

const MessageWrap = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
  overflow-wrap: break-word;
  word-break: break-word;

  #me {
    justify-content: flex-end;
    background-color: white;
  }

  #user {
    justify-content: flex-start;
    background-color: #7f83ea;
  }
`;

const SendWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  gap: 5px;

  .textarea {
    width: 100%;
    border-radius: 5px;
  }

  .send {
    border: none;
    border-radius: 5px;
    padding: 8px;
    background-color: #7f83ea;
    color: #fff;
  }
`;
