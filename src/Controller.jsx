import React,{useState} from 'react'
import './Controller.css'

const Controller = () => {

    const [recording, setRecording]= useState(false)
    const [paused, setPaused]= useState(false)

    return (
        <div className="controllerPage">
           
            <div className="controllerContainer">
                <h1>Controller</h1>
                {!recording &&<button className="record">Record</button>}

                {recording &&<button className="stop">Stop Record</button>}

                {recording && <button className="pause">Pause Record</button>}

                {recording &&<button className="resume">Resume Record</button>}
                
            </div>
            
        </div>
    )
}

export default Controller
