import { ChatContainer, MainContainer, Message, MessageInput, MessageList } from "@chatscope/chat-ui-kit-react"
import "./app.css"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";


function App() {
  const [messages,setMessages] = useState([
    {
      message:"Hello ChatGpt here",
      sender:"ChatGPT"
    }
  ])
  const handleSend=async(message)=>{
    const newMessage = {
      message:message,
      sender:"user",
      direction:"outgoing"
    }
    const newMessages = [...messages,newMessage]
    setMessages(newMessages)
  }

  return (
    <>
      <div className="app">
       <div style={{position:"relative",height:"100vh",width:"100vw"}}>
        <MainContainer>
          <ChatContainer>
          <MessageList>
          {messages.map((m,i)=>{
            return <Message key={i} model={m}/>
          })}
          </MessageList>   
          <MessageInput placeholder="Type message here" onSend={handleSend}/>         
          </ChatContainer>
        </MainContainer>
       </div>       
      </div>
       
    </>
  )
}

export default App
