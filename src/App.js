import './App.css';
import Log from './Log';
import react,{useState} from 'react';
import Controller from './Controller';
import Scenes from './Scenes';
import OBSWebSocket from 'obs-websocket-js'
import PreviewScene from './PreviewScene';

const obs = new OBSWebSocket();

  let time = ""
  function handleRecord(){
    obs.send('StartRecording',{})
    .then(()=>{
    obs.send('GetRecordingStatus', {})
    .then(
      data=> console.log(data.recordTimecode)
     )
    
    })
  }
  function handleStopRecord(){
    obs.send('StopRecording',{})
    obs.send('GetRecordingStatus', {})
    .then(data=> console.log(data.recordTimecode))
  }
  function handlePause(){
    obs.send('PauseRecording',{})
    obs.send('GetRecordingStatus', {})
    .then(data=> console.log(data))
  }
  function handleResumeRecord(){
    obs.send('ResumeRecording')
  }

function App() {

  const [connection, setConnection] = useState(false)
  const[scenesList, setScenesList] = useState([])
  const[preview, setPreview] = useState()
  

  const handleLog=(host, pass)=>{
    obs.connect({
      address: host,
      password: pass
    })
    .then(() => {
      setConnection(true)
      obs.send('GetRecordingStatus', {}).then(data=> console.log(data))
      return obs.send('GetSceneList');
    })
    .then(data => {
      
      data.scenes.forEach(scene => {
      setScenesList(cs=> [...cs, scene.name])
      });
    })
    .catch(err => { 
      console.log(err);
    });
  }

  obs.on('error', err => {
    console.error('socket error:', err);
  });

  obs.send('GetRecordingStatus', {}).then(data=> console.log(data))

  return (
    <div className="App">
      {!connection && <Log handleLog={handleLog}/>}
      {connection && 
      <PreviewScene 
      
      // imgURL={screenShotPreview}
      />}
      {connection && 
      <Scenes 
      // previewScene={previewScene}
      scenes={scenesList}/>}
      {connection &&
      <Controller
      handleRecord={handleRecord}
      handleStopRecord={handleStopRecord}
      handlePause={handlePause}
      handleResumeRecord={handleResumeRecord}
      />
      }
      <h1>
        {time}
      </h1>
    </div>
  );
}

export default App;
