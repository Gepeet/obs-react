import './App.css';
import Log from './Log';
import react,{useState} from 'react';
import Controller from './Controller';
import Scenes from './Scenes';
import OBSWebSocket from 'obs-websocket-js'
import PreviewScene from './PreviewScene';

const obs = new OBSWebSocket();

let screenShotPreview = ""

  function handleRecord(){
    obs.send('StartRecording')
  }
  function handleStopRecord(){
    obs.send('StopRecording')
  }
  function handlePause(){
    obs.send('PauseRecording')
  }
  function handleResumeRecord(){
    obs.send('ResumeRecording')
  }

  function previewScene(){
    obs.send('TakeSourceScreenshot', { sourceName: 'Scene 4', embedPictureFormat: 'png', width: 960, height: 540 })
    .then(data=>{
      screenShotPreview = data.img
    })
  }

function App() {

  const [connection, setConnection] = useState(false)
  const[scenesList, setScenesList] = useState([])

  const handleLog=(host, pass)=>{
    obs.connect({
      address: host,
      password: pass
    })
    .then(() => {
      setConnection(true)
      return obs.send('GetSceneList');
    })
    .then(data => {
      
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

  return (
    <div className="App">
      {!connection && <Log handleLog={handleLog}/>}
      {connection && 
      <PreviewScene imgURL={screenShotPreview}/>}
      {connection && 
      <Scenes 
      previewScene={previewScene}
      scenes={scenesList}/>}
      {connection &&
      <Controller
      handleRecord={handleRecord}
      handleStopRecord={handleStopRecord}
      handlePause={handlePause}
      handleResumeRecord={handleResumeRecord}
      />
      }
    </div>
  );
}

export default App;
