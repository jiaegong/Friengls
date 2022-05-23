import React, { useEffect, useState } from 'react';

const Chat = ({ socket, roomId, userName }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: roomId,
        author: userName,
        message: currentMessage,
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div>
        {messageList.map((message, idx) => {
          return (
            <div key={idx}>
              <div>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <textarea
        onKeyDown={(e) => {
          e.key === 'Enter' && sendMessage();
        }}
      />
    </div>
  );
};

export default Chat;
