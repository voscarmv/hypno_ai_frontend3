import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeThread } from './store/chatSlice';
import ChatInterface from './components/ChatInterface';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeThread());
  }, [dispatch]);

  return (
    <div className="p-4 font-mono">
      <h1 className="text-xl mb-4">Hypno.ai Chat</h1>
      <b>Author: </b>Oscar Mier voscarmv@gmail.com (<a href="https://linkedin.com/in/oscar-mier">Hire me!</a>)<br></br><br></br>
      <ChatInterface />
      <Analytics />
    </div>
  );
}

export default App;