import React from 'react'
import './Log.css'

const Log = () => {
    return (
        <div className="loginPage">
            <div className="connectionContainer">
                <h2>Connect to OBS Websocket</h2>
                <form className="connectionForm" action="">
                    <label>host location</label>
                    <input className="connectionInput" type="text" />
                    <label>Password</label>
                    <input className="connectionInput" type="password" />
                    <button className="connectButton" type="submit">Connect</button>
                </form>
            </div>
        </div>
    )
}

export default Log
