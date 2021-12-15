import React from 'react'
import './PreviewScene.css'

const PreviewScene = ({currentScene,media}) => {

    return (
        <div className="previewPage">
            <img src={media} alt={media} className="previewContainer"/>
        </div>
    )
}

export default PreviewScene
