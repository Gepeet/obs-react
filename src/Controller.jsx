import React,{useState} from 'react'
import './Controller.css'

const Controller = ({handleRecord, handleStopRecord, handlePause, handleResumeRecord}) => {
    const [recording, setRecording]= useState(false)
    const [paused, setPaused]= useState(false)

    const record=(e)=>{
        e.preventDefault()
        handleRecord()
        setRecording(!recording);
    }
    const stop=(e)=>{
        e.preventDefault()
        handleStopRecord()
        setRecording(!recording);
    }
    const pause=(e)=>{
        e.preventDefault()
        handlePause()
        setPaused(!paused);
    }
    const resume=(e)=>{
        e.preventDefault()
        handleResumeRecord()
        setPaused(!paused);
    }
   
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
            </div>
        </div>
    )
}

export default Controller
