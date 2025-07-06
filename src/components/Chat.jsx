import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/Socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Chat = () => {
    const param = useParams();
    const targetUserId = param.id;
    const [message, setMessage] = useState([]);
    const [inputText, setInputText] = useState("");

    const user = useSelector((state) => state.user);
    const userId = user?._id;

    const fetchingChatData = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "chat",
                { userId: userId, targetUserId: targetUserId },
                { withCredentials: true }
            );
            const allChat = res?.data?.message.map((msg) => {
                return {
                    text: msg?.text,
                    firstName: msg.senderId?.firstName,
                    profileImg: msg.senderId?.profileImg,
                    time: new Date(msg?.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };
            });
            setMessage(allChat);
        } catch (error) {
            console.error("Error fetching chat data:", error);
        }
    };

    useEffect(() => {
        fetchingChatData();
    }, [userId, targetUserId]);

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId });


        socket.emit("checkOnlineStatus", { targetUserId });
        socket.on("onlineStatus", ({ isOnline }) => {
            setOnlineStatus(isOnline);
        });

        socket.on("messageRecived", ({ firstName, text }) => {
            setMessage((msg) => [...msg, { firstName, text }]);
        });



        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    function keyHandler(e) {
        if (e.key === "Enter") {
            sendMessageHandler();
        }
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    function sendMessageHandler() {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            userId,
            targetUserId,
            firstName: user.firstName,
            text: inputText,
        });
        setInputText("");
    }

    return (
        <div className="w-full h-[80vh] flex justify-center text-amber-50">
            <div className="w-1/2 h-full relative">
                <div className="h-10 border border-white/30 py-2 bg-black">

                </div>
                <div className="w-full h-[68vh] overflow-y-auto bg-black  px-3">
                    {message.map((msg, i) => (
                        <div className="text-white bg-indigo-600" key={i}>
                            <div
                                className={
                                    "chat " +
                                    (msg.firstName === user?.firstName
                                        ? "chat-end"
                                        : "chat-start")
                                }
                            >
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src={msg.profileImg}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header capitalize">
                                    {msg.firstName}
                                    <time className="text-xs opacity-50">{msg?.time}</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
                <div className="absolute bottom-2 flex w-full">
                    <input
                        type="text"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                        onKeyDown={keyHandler}
                        placeholder="Type here"
                        className="input w-full bg-black "
                    />
                    <button className="btn btn-primary" onClick={sendMessageHandler}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
