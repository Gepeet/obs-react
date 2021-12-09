import React,{useState, useEffect} from 'react'
import './Controller.css'
import Timer from './Timer'

const Controller = ({
    handleRecord, 
    handleStopRecord, 
    handlePause,
    handleResumeRecord
    }) => {

    const [recording, setRecording]= useState(false)
    const [paused, setPaused]= useState(false)
    const [time, setTime] = useState(0)
    const [lightOpacity, setLightOpacity] = useState("gray")

    const record=()=>{
        handleRecord()
        setRecording(true)
        setPaused(false)
        handleLight(true)
    }
    const stop=(e)=>{
        handleStopRecord()
        setRecording(!recording);
        handleLight(false)
    }
    const pause=(e)=>{
        handlePause()
        setPaused(!paused);
    }
    const resume=(e)=>{
        handleResumeRecord()
        setPaused(!paused);
    }

    const handleLight=(e)=>{
        if(e === !false){
            setLightOpacity("red")
        }else{
            setLightOpacity("gray")
        }
    }
    
    useEffect(() => {
        let interval = null;
      
        if (recording === !false && paused === false) {
          interval = setInterval(() => {
            setTime((time) => time + 10);
          }, 10);
        }else if(recording === false && paused === false){
            setRecording(false);
          setTime(0);
        }
         else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
      }, [recording, paused]);
      
    return (
        <div className="controllerPage">
            <div className="controllerContainer">
                <h1>Controller</h1>
                <div className="buttonList">
                    {!recording &&<button onClick={record} className="record">Record</button>}
                    {recording && !paused &&<button onClick={stop} className="stop">Stop Record</button>}
                    {recording && !paused && <button onClick={pause} className="pause">Pause Record</button>}
                    {recording, paused &&<button onClick={resume} className="resume">Resume Record</button>}
                </div>
                <div className="recordStat">
                    <span style={{
                        opacity: '1',
                        backgroundColor:`${lightOpacity}`
                    }} className="lightStatus">
                    </span>
                    <Timer time={time} />
                </div>
            </div>
        </div>
    )
}

export default Controller
