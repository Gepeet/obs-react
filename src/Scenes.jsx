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
                    <table>
                        <li key={data.key}>{data}</li>
                    </table>
                    )
                })}
            </div>
        </div>
    )
}

export default Scenes
