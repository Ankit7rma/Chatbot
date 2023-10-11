import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from "@chatscope/chat-ui-kit-react"

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";

function App() {

  // const API_KEY = import.meta.env.VITE_APP_ChatGPT_API_KEY;
  //   const [typing , setTyping] = useState(false)
  //   const [messages,setMessages] = useState([
    //     {
//       message:"Hello ChatGpt here",
//       sender:"ChatGPT"
//     }
//   ])
//   const handleSend=async(message)=>{
//     const newMessage = {
//       message:message,
//       sender:"user",
//       direction:"outgoing"
//     }
//     const newMessages = [...messages,newMessage]
//     setMessages(newMessages)
//     setTyping(true);
//     // setTimeout(() => {
//     //   setTyping(false);
//     // }, 3000);
//     await processMessageToChatGPT(newMessages)
//   }
//   async function processMessageToChatGPT(chatMessages){
//     //chatMessages {sender:"user" or "chatGPT",message:"The message content here"}
//     //apiMessages {role:"user" or "assistant" , content:"The message content here"}
//     let apiMessages = chatMessages.map((messageObject)=>{
//       let role=" ";
//       if(messageObject.sender === "ChatGPT"){
//         role="assistant"
//       }else{
//         role="user"
//       }
//       return {
  //         role:role,content:messageObject.message
//       }
//     });

//     const systemMessage= {
  //       role:"system",
//       content:"Explain all concepts of Life"
//     }
//     const apiRequestBody = {
  //       "model": "gpt-3.5-turbo",
  //      "messages": [
//       systemMessage,
//       ...apiMessages],
//     }
//     const response = await fetch("https://api.openai.com/v1/chat/completions",{
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer " +API_KEY,
//         "Content-Type": "application/json"
//       },
      
//       body:JSON.stringify(apiRequestBody)
//   })
//   const data = await response.json()
//   console.log(data)
//   setMessages([
//     ...chatMessages,{
//       message:data?.choices[0].message.content,
//       sender:"ChatGPT"
//     }
//   ])
//   setTyping(false)
// }







const API_KEY = "NOthing"
// const API_KEY = " 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";
const [typing, setTyping] = useState(false);
const [messages, setMessages] = useState([
  {
    message: "Hello ChatGpt here",
    sender: "ChatGPT",
  },
]);

const handleSend = async (message) => {
  const newMessage = {
    message: message,
    sender: "user",
    direction: "outgoing",
  };
  const newMessages = [...messages, newMessage];
  setMessages(newMessages);
  setTyping(true);

  try {
    const response = await processMessageToChatGPT(newMessages, API_KEY);
    if (response) {
      setMessages([
        ...newMessages,
        {
          message: response,
          sender: "ChatGPT",
        },
      ]);
    }
  } catch (error) {
    console.error("Error processing message:", error);
  } finally {
    setTyping(false);
  }
};

async function processMessageToChatGPT(chatMessages, apiKey) {
  const systemMessage = {
    role: "system",
    content: "Explain all concepts of Life",
  };

  const apiMessages = chatMessages.map((messageObject) => {
    return {
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message,
    };
  });

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...apiMessages],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return "No response from ChatGPT.";
    }
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
}


  return (
    <>
      <div className="app">
       <div style={{position:"relative",height:"100vh",width:"100vw"}}>
        <MainContainer>
          <ChatContainer>
          <MessageList 

          typingIndicator={typing? <TypingIndicator content="ChatGPT is Typing"/>:null }
          >
          {messages.map((m,i)=>{
            return <Message style={{height:"50px" , fontSize:"20px"}} key={i} model={m}/>
          })}
          </MessageList>   
          <MessageInput  style={{height:"70px",fontSize:"25px"}} placeholder="Type message here" onSend={handleSend}/>         
          </ChatContainer>
        </MainContainer>
       </div>       
      </div>
       
    </>
  )
}

export default App
