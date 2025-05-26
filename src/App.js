import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeThread } from './store/chatSlice';
import ChatInterface from './components/ChatInterface';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeThread());
  }, [dispatch]);

  return (
    <div className="p-4 font-mono">
      <h1 className="text-xl mb-4">Hypno.ai Chat</h1>
      <ChatInterface />
    </div>
  );
}

export default App;