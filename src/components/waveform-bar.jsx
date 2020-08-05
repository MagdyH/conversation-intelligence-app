import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import playerActions from '../redux/actions/player';
import Transcripts from "../files/transcript.json";
import WaveSurfer, { } from 'wavesurfer.js';
import Sound from '../files/59e106639d79684277df770d.wav';
import WaveformData from 'waveform-data';
import WavePlayer from 'waveplayer';
import AudioSVGWaveform from 'audio-waveform-svg-path';


class WaveformBars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startTime: 0,
            endTime: 10
        }

        this.waveform = createRef();
        this.waveformpalyer = createRef();

    }
    async componentDidMount() {
        let startTime = parseFloat(Transcripts.word_timings[0][0].startTime.replace('s', ''));
        let endTime = parseFloat(Transcripts.word_timings[Transcripts.word_timings.length - 1][Transcripts.word_timings[Transcripts.word_timings.length - 1].length - 1].endTime.replace('s', ''));

        const track = document.getElementById('audio');
        this.setState({ startTime, endTime });



        this.wavesurfer = WaveSurfer.create({
            barWidth: 1,
            cursorWidth: 1,
            barGap: 2,
            barHeight: 1,
            //barMinHeight:7,
            container: this.waveform.current,//'#waveform',
            backend: 'MediaElement',
            height: 80,
            progressColor: '#b7c0ce',
            //splitChannels: true,
            responsive: true,
            waveColor: '#1a99f6',
            cursorColor: '#4a74a5',
            responsive: true,
            plotArray: Transcripts.word_timings
        });

        this.wavesurfer.load(track);
            
    }   

    render() {
        let { startTime, endTime } = this.state;
        const { currentTime, duration } = this.props;

        let percentage = (currentTime / endTime) * 100;
        let total = 0;
        Transcripts.word_timings.map(transcript => {
            transcript.map(word => {
                total++;
            });
        });

        let currentTimeMin = Math.floor(currentTime % 3600 / 60);
        let currentTimeSec = Math.floor(currentTime % 3600 % 60);
        let currentTimeFormat = currentTimeMin.toString().padStart(2, '0') + ":" + currentTimeSec.toString().padStart(2, '0');

        let durationMin = Math.floor(duration ? duration : 0 % 3600 / 60);
        let durationSec = Math.floor(duration ? duration : 0 % 3600 % 60);
        let durationFormat = durationMin.toString().padStart(2, '0') + ":" + durationSec.toString().padStart(2, '0');
        return (
            <>
                <div style={{ marginTop: "25px" }} className={"container-fluid"}>
                    <div className={"row time-duration"}>
                        <div style={{ color: '#717b88' }}>
                            {`${currentTimeFormat} / `}
                        </div>

                        <div style={{ color: '#c0c9d4' }}>
                            {` ${durationFormat}`}
                        </div>
                    </div>
                    <div className={"row waveform-row"}>
                        <div style={{ margin: 'auto' }} className={"col-2"}>
                            <div className={'you-label'}>
                                <span >{Math.round((Transcripts.word_timings[Transcripts.word_timings.length - 1].length / total) * 100)}%</span> <label>YOU</label>
                            </div>
                            <br />
                            <div className={'agent-label'}>
                                <span >{Math.round((Transcripts.word_timings[0].length / total) * 100)}%</span>  <label>BRAIN I.</label>
                            </div>

                        </div>

                        <div className={"col-10"}>
                             <div id={'waveform'} ref={this.waveform}></div>

                            <div id={'waveformplayer'} ref={this.waveformpalyer}></div>
                        </div>
                    </div>
                    <div className={"row"}>

                    </div>
                </div>               
            </>
        )
    }
}
function mapStatetoProps({ playerReducer }) {
    return {
        currentTime: playerReducer.currentTime,
        duration: playerReducer.duration
    }
}
function mapDispatcherToProps(dispatch) {
    return {
        Actions: bindActionCreators(playerActions, dispatch)
    }
}

export default connect(mapStatetoProps, mapDispatcherToProps)(WaveformBars);

