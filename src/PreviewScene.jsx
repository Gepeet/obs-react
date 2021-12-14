import React from 'react'
import './PreviewScene.css'

const PreviewScene = (currentScene,media) => {

    return (
        <div className="previewPage">
            <img src={currentScene.currentScene[0]} alt={currentScene.currentScene[0]} className="previewContainer"/>
        </div>
    )
}

export default PreviewScene
