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
      <p><b>Author: </b>Oscar Mier <a href="mailto:voscarmv@gmail.com">voscarmv@gmail.com</a> (<a href="https://linkedin.com/in/oscar-mier">Hire me!</a>)</p>
      <p>
        <ul>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">Instricciones en Español</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">Instructions in English</a></li>
        </ul>
    </p>
    <ChatInterface />
    <Analytics />
    </div>
  );
}

export default App;