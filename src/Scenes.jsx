import React from 'react'
import './Scenes.css'

const Scenes = ({scenes,previewScene}) => {

    const list = scenes;

    const handleScenePreview= (data)=>{
        // console.log(data)
        // previewScene(data)
    }

    return (
        <div className="scenesPage">
            <div className="scenesContainer">
                <h2>Scenes List</h2>
                <div className="list">
                {list.map(data=>{
                    return(
                    
                        <li onClick={handleScenePreview(data)}>{data}</li>
                    
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Scenes
