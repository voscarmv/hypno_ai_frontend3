import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../store/chatSlice';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const { messages, progress, downloadUrl, loading } = useSelector((s) => s.chat);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
    }
  };

  return (
    <div>
      <div className="mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div>Thinking...</div>}
        {progress > 0 && <div>Progress: {progress}%</div>}
        {downloadUrl && (
          <div>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download Audio</a>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
      </form>
    </div>
  );
};

export default ChatInterface;
