import React, {useState} from 'react'
import './Scenes.css'

const Scenes = ({scenes,previewScene, currentScene,studioMode,handleSceneChange}) => {

    const list = scenes;
    
    return (
        <div className="scenesPage">
            <div className="scenesContainer">
                <div className='title'>
                    <h2>Scenes List</h2>
                    <div className='sturiomode'>
                        <h2>Studio Mode</h2>
                        {studioMode ? <h3 style={{
                            'backgroundColor':'green'
                        }}>Enabled</h3> : <h3 style={{
                            'backgroundColor':'red'
                        }}>Disabled</h3> }
                    </div>
                </div>
                <div className="list">
                {list.map(data=>{
                    return(
                        <div className='sceneNameContainer'>
                            <li onClick={()=>{
                                handleSceneChange(data)
                                }}>{data}</li>
                            {currentScene === data ? <span>Current Scene</span>: <span></span>}
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Scenes
