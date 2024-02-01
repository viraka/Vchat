import React, { useState, useEffect } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import "../styles/Chat.css"
const Chat = (props) => {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages")


    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room", "==", props.room),
            orderBy("createdAt")
        )
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let tempMessages = [];
            snapshot.forEach((doc) => {
                tempMessages.push({ ...doc.data(), id: doc.id });
            })
            setMessages(tempMessages);
        });

        return () => unsubscribe();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room
        })
        setNewMessage("");
    }

    return (
        <div className='chat-app container'>
            <div className="header">
                <h1>Welcome to: {props.room} </h1>
            </div>
            <div className='wow'>
                <div className='messages'>
                    {messages.map((message) => (
                        <div>
                            <div className='message' key={message.id}><span className='user'>{message.user} :</span> {message.text}</div>
                        </div>
                    ))}
                </div>

                <form className='new-message-form' onSubmit={handleSubmit}>
                    <input
                        className='new-message-input'
                        placeholder='Type your message here ...'
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    />
                    <button type='submit' className='send-button'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat