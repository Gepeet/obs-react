import React from 'react'
import './Scenes.css'

const Scenes = ({scenes}) => {

    const list = scenes;

    return (
        <div className="scenesPage">
            <div className="scenesContainer">
                <h2>Scenes List</h2>
                {list.map(data=>{
                    return(
                    <ul key={data.index}>
                        <li>{data}</li>
                    </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default Scenes
