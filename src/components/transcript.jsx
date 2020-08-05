import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from "./search";
import Transcripts from "../files/transcript.json";
import playerActions from '../redux/actions/player';


function Transcript(props) {
    console.log(Transcripts);
    console.log(props.currentTime);
    return (
        <>
            <div className={"row"}>
                <Search />
            </div>

            <div style={{ marginTop: "20px" }} className={"container-fluid"}>
                {Transcripts.transcript_text.map((transcript, index) => {
                    let timeClassName = (index == 0 || index % 2 == 0) ? "Transcript-font-color" : "Transcript-reply-font-color";
                    let bodyClassName = (index == 0 || index % 2 == 0) ? "Transcript-body-font-color" : "Transcript-body-reply-font-color";

                    let startTime = parseFloat(Transcripts.word_timings[index][0].startTime.replace('s', ''));
                    let endTime = parseFloat(Transcripts.word_timings[index][Transcripts.word_timings[index].length - 1].startTime.replace('s', ''));
                    let isHover = (props.currentTime >= startTime) && (props.currentTime < endTime);
                    let hoverClass = isHover ? "hoverbg" : "";

                    let min = Math.floor(startTime % 3600 / 60);
                    let sec = Math.floor(startTime % 3600 % 60);

                    return (<div key={index} className={`${hoverClass} row`} style={{ marginBottom: "15px" }}>
                        <div className={`${timeClassName}`}>
                            {min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0')}

                        </div>
                        <div className={`${bodyClassName} col-8`}>
                            {Transcripts.word_timings[index].map((word,index) => {
                                let wordStartTime = parseFloat(word.startTime.replace('s', ''));
                                let wordEndTime = parseFloat(word.endTime.replace('s', ''));
                                let isHover = (props.currentTime >= wordStartTime) && (props.currentTime < wordEndTime);
                                let wordHover = isHover ? "wordhover" : ""
                                return <span key={index} className={wordHover} onClick={() => {
                                    props.Actions.setAudioTimebyWordTime(wordStartTime);
                                }}>{`${word.word} `}</span>
                            })
                            }
                            {
                                isHover &&
                                <div className="row">
                                    <button className="btn Share-Transcript">Share</button>
                                </div>
                            }
                        </div>

                    </div>)
                }
                )}
            </div>
        </>
    )
}

function mapStatetoProps({ playerReducer }) {
    return {
        currentTime: playerReducer.currentTime
    }
}
function mapDispatcherToProps(dispatch) {
    return {
        Actions: bindActionCreators(playerActions, dispatch)
    }
}

export default connect(mapStatetoProps, mapDispatcherToProps)(Transcript);