import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sound from '../files/59e106639d79684277df770d.wav';
import playerActions from '../redux/actions/player';

function PlayBar(props) {
    const [isPlay, setIsPlay] = useState(false);
    const audioRef = useRef();

    let audio = new Audio(Sound);
    audio.crossOrigin = "anonymous";
    audio.load();
    
    const handlePlayBtn = (flag) => {
        if (flag) {
            audioRef.current.addEventListener('ended', () => setIsPlay(false));
        }
        else {
            audioRef.current.removeEventListener('ended', () => setIsPlay(false));
        }
        setIsPlay(flag);
    }

    if (props.wordStartTime) {
        audioRef.current.currentTime = props.wordStartTime;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark Bar-header primary-color">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li style={{ marginTop: "6px" }} className="nav-item">
                            <button className="btn"><i className="fa fa-undo"></i></button>
                        </li>
                        {
                            (!isPlay || audioRef.current.ended) ?
                                <button className="btn" onClick={() => {

                                    let playPromise = audioRef.current.play();
                                    if (playPromise) {
                                        playPromise.then(() => {
                                            console.log("ready");
                                            handlePlayBtn(true);
                                        }).catch((err) => {
                                            console.log("error", err);
                                        })
                                    }
                                    //

                                }}><i className="fa fa-play-circle fa-2x"></i></button>
                                : <button className="btn" onClick={() => {
                                    audioRef.current.pause()
                                    //audio.pause();
                                    handlePlayBtn(false);

                                }}><i className="fa fa-pause-circle fa-2x"></i></button>
                        }
                        <li className="nav-item">

                        </li>
                        <li style={{ marginTop: "5px" }} className="nav-item">
                            <button className="btn"><i className="fa fa-repeat"></i></button>
                        </li>
                        <li style={{ marginTop: "13px", marginLeft: "12px" }} className="nav-item">
                            <span className="Bar-label">1.0X</span>
                        </li>
                    </ul>

                    <audio id={'audio'} ref={audioRef} src={Sound} onTimeUpdate={(event) => {
                        console.log("event", event);
                        props.Actions.asyncPlayerwithTranscript(event.currentTarget.currentTime, event.currentTarget.duration)
                    }}
                    onLoadedMetadata={(event)=>{
                        props.Actions.asyncPlayerwithTranscript(event.currentTarget.currentTime, event.currentTarget.duration)
                    }}
                    ></audio>
                    <button style={{ border: "1px solid #ccc!important" }} className="btn btn-light btn-sm"><i className="fa fa-share"></i> Share</button>
                </div>
            </nav>
        </>
    )
}

function mapStatetoProps({ playerReducer }) {
    return {
        wordStartTime: playerReducer.wordStartTime
    }
}

function mapDispatcherToProps(dispatch) {
    return {
        Actions: bindActionCreators(playerActions, dispatch)
    }

}

export default connect(mapStatetoProps, mapDispatcherToProps)(PlayBar);