import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayBar from './components/play-bar';
import Transcript from './components/transcript';
import WaveformBars from './components/waveform-bar';
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PlayBar />
        <WaveformBars />
        <Transcript />
      </div>
    </Provider>
  );
}

export default App;
