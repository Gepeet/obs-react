import './App.css';
import Log from './Log';
import react,{useState} from 'react';
import Controller from './Controller';
import Scenes from './Scenes';
const OBSWebSocket = require('obs-websocket-js');


function App() {

  const obs = new OBSWebSocket();
  const [connection, setConnection] = useState(false)
  const[scenesList, setScenesList] = useState([])

  const handleLog=(host, pass)=>{
    obs.connect({
      address: host,
      password: pass
  })
  .then(() => {
    console.log(`Success! We're connected & authenticated.`);
    setConnection(true)
    alert(`Success! We're connected & authenticated.`)
    return obs.send('GetSceneList');
  })
  .then(data => {
    console.log(`${data.scenes.length} Available Scenes!`);
    
    data.scenes.forEach(scene => {
     setScenesList(cs=> [...cs, scene.name])
        if (scene.name !== data.currentScene) {
            console.log(`Found a different scene! Switching to Scene: ${scene.name}`);

            obs.send('SetCurrentScene', {
                'scene-name': scene.name
            });
        }
    });
  })
  }

  // obs.on('ConnectionOpened', () => {
  //   const handleRecord = ()=>{
  //     obs.send('StartRecording')
  //   }
  // })

  return (
    <div className="App">
      {!connection && <Log handleLog={handleLog}/>}
      {connection && 
      <Scenes scenes={scenesList}/>}
      {/* {connection &&
      <Controller
      handleRecord={handleRecord}/>
      } */}
    </div>
  );
}

export default App;
