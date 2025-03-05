import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'

const Chat = () => {
    const param = useParams()
    const targetUserId = param.id
    const [message, setMessage] = useState([])
    const [inputText, setInputText] = useState('')
    const user = useSelector(state => state.user)
    const userId = user?._id

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection()
        socket.emit("joinChat", { userId, targetUserId })

        socket.on("messageRecived", ({ firstName, text }) => {
            setMessage(msg => [...msg, { firstName, text }])
        })

        return () => {
            socket.disconnect()
        }

    }, [userId, targetUserId])

    function sendMessageHandler() {
        const socket = createSocketConnection()
        socket.emit("sendMessage", { userId, targetUserId, firstName: user.firstName, text: inputText })
        setInputText('')
    }

    return (
        <div className='w-full h-[80vh] flex justify-center'>
            <div className='w-1/2 h-full relative'>
                {message.map((msg, i) => (
                    <div key={i}>
                        <div className="chat chat-start">
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    </div>
                ))}
                <div className='absolute bottom-2 flex w-full'>
                    <input
                        type="text"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                        placeholder="Type here"
                        className="input w-full"
                    />
                    <button className="btn btn-primary" onClick={sendMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
