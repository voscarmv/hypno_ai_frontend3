import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: null,
  messages: [],
  loading: false,
  progress: 0,
  downloadUrl: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initializeThread: () => {},
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    sendMessage: (state, action) => {
      state.messages.push({ sender: 'User', text: action.payload });
      state.loading = true;
      state.progress = 0;
      state.downloadUrl = null;
    },
    receiveMessage: (state, action) => {
      state.messages.push({ sender: 'Hypno.ai', text: action.payload });
      state.loading = false;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setDownloadUrl: (state, action) => {
      state.downloadUrl = action.payload;
    },
  },
});

export const {
  initializeThread,
  setThreadId,
  sendMessage,
  receiveMessage,
  setProgress,
  setDownloadUrl,
} = chatSlice.actions;

export default chatSlice.reducer;
