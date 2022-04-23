import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { IoMdSend } from 'react-icons/io';
import { useRouter } from "next/router";
import ScrollToBottom from "react-scroll-to-bottom";

function chat() {
    let { setCurrentMessage, roomId, name, currentMessage, socket } = useGlobalContext();
    const [messageList, setMessageList] = useState([]);
    const router = useRouter();

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: roomId,
                author: name,
                id: socket.id,
                message: currentMessage,
                time: new Date().toLocaleString('en-us', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => {
                return [...list, messageData]
            });
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket ? socket.on("receive_message", (data) => {
            setMessageList((list) => {
                return [...new Set([...list, data].map(item => item))];
            });

        }) : router.push('/')

    }, [socket]);
    return (
        <div className="chat-window ">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div
                                key={index}
                                className="message"
                                id={socket.id === messageContent.id ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}><IoMdSend /></button>
            </div>
        </div>
    )
}
export default chat