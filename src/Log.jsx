import React,{useState} from 'react'
import './Log.css'

const Log = ({handleLog}) => {

    const [host,setHost]=useState("")
    const [pass,setPass]=useState("")

    const submitForm=(e)=>{
        e.preventDefault()
        handleLog(host,pass)
    }
    return (
        <div className="loginPage">
            <div className="connectionContainer">
                <h2>Connect to OBS Websocket</h2>
                <form className="connectionForm" onSubmit={submitForm}>
                    <label>host location</label>
                    <input 
                    className="connectionInput" 
                    type="text"
                    value={host}
                    onChange={e=>setHost(e.target.value)}
                     />
                    <label>Password</label>
                    <input 
                    className="connectionInput" 
                    type="password" 
                    value={pass}
                    onChange={e=>setPass(e.target.value)}
                    />
                    <button className="connectButton" type="submit">Connect</button>
                </form>
            </div>
        </div>
    )
}

export default Log
