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
    const [onlineStatus, setOnlineStatus] = useState(false);

    const user = useSelector((state) => state.user.user);
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
                    profileImg: msg.senderId?.profileImg || "https://via.placeholder.com/40", // fallback image
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
        if (userId && targetUserId) {
            fetchingChatData();
        }
    }, [userId, targetUserId]);

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId });

        socket.emit("checkOnlineStatus", { targetUserId });
        socket.on("onlineStatus", ({ isOnline }) => {
            setOnlineStatus(isOnline);
        });

        socket.on("messageRecived", ({ firstName, text, profileImg }) => {
            setMessage((msg) => [...msg, { firstName, text, profileImg }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    function keyHandler(e) {
        if (e.key === "Enter") {
            sendMessageHandler();
        }
    }

    function sendMessageHandler() {
        if (!inputText.trim()) return;

        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            userId,
            targetUserId,
            firstName: user.firstName,
            profileImg: user.profileImg,
            text: inputText,
        });
        setInputText("");
    }

    // ✅ Show loading screen if user not ready
    if (!user || !user._id) {
        return <div className="text-white text-center mt-10">Loading chat...</div>;
    }

    return (
        <div className="w-full h-[78vh] flex justify-center text-amber-50">
            <div className="md:w-1/2 h-full w-full relative">
                <div className="h-10 border p-2 border-white/30 py-2 bg-black">
                    Chat Box ({onlineStatus ? "Online" : "Offline"})
                </div>
                <div className="w-full h-[68vh] overflow-y-auto bg-zinc-900 px-3">
                    {message.map((msg, i) => (
                        <div key={i}>
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
                                            alt="profile"
                                            src={msg.profileImg}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header capitalize">
                                    {msg.firstName}
                                    <time className="text-xs opacity-50 ml-2">{msg?.time}</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
                <div className="absolute bottom-0 flex w-full">
                    <input
                        type="text"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                        onKeyDown={keyHandler}
                        placeholder="Type here"
                        className="p-2 w-full bg-black outline-none rounded-none border-none"
                    />
                    <button className="btn btn-primary rounded-none" onClick={sendMessageHandler}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
