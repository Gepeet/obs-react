import React from 'react'
import './PreviewScene.css'

const PreviewScene = (imgURL) => {
    return (
        <div className="previewPage">
            <img src={imgURL} alt="preview scene" className="previewContainer"/>
            
        </div>
    )
}

export default PreviewScene
