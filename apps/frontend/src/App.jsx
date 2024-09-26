import React from 'react'
import ChatView from './components/ChatView'
import ChatLayout from './components/ChatLayout'


function App() {
  return (
    <div className="flex justify-start min-w-full min-h-screen ">
      <ChatLayout >
        <ChatView />
      </ChatLayout>
    </div>
  )
}

export default App