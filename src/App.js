import './App.css';
import Log from './Log';
import React,{useState} from 'react';
import Controller from './Controller';
import Scenes from './Scenes';
import OBSWebSocket from 'obs-websocket-js'
import PreviewScene from './PreviewScene';

const obs = new OBSWebSocket();

  let time = ""
  function handleRecord(){
    obs.send('StartRecording',{})
    .then(()=>{
    obs.send('GetRecordingStatus', {})})
  }
  function handleStopRecord(){
    obs.send('StopRecording',{})
    obs.send('GetRecordingStatus', {})
  }
  function handlePause(){
    obs.send('PauseRecording',{})
    obs.send('GetRecordingStatus', {})
  }
  function handleResumeRecord(){
    obs.send('ResumeRecording')
  }

  

function App() {

  const [connection, setConnection] = useState(false)
  const[scenesList, setScenesList] = useState([])
  // const[preview, setPreview] = useState()
  const [currentScene, setCurrentScene]= useState('')
  const [previewScene, setPreviewScene]= useState('')
  const [studioMode, setStudioMode]= useState(null)
  const [media, setMedia]= useState()
  const[wholeCurrentScene,setWholeCurrentScene]= useState()
  

  const handleLog=(host, pass)=>{
    obs.connect({
      address: host,
      password: pass
    })
    .then(() => {
      setConnection(true)
      // obs.send('GetRecordingStatus', {}).then(data=> console.log(data))
      return obs.send('GetSceneList');
    })
    .then(data => {
      obs.send('GetCurrentScene',{}).then(e=>{
        setCurrentScene(e.name)
        setWholeCurrentScene(e)
      })
      obs.send('GetPreviewScene',{}).then(e=>setPreviewScene(e.sources))
      obs.send('GetStudioModeStatus',{}).then(e=>setStudioMode(e['studio-mode']))
      obs.send('CreateSource',{'sceneName':'Scene 4','sourceKind':'image_source','sourceName':''}).then(e=>setMedia(e.mediaSources.sourceKind))

      previewScreen()
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

  const handleSceneChange=(data)=>{
    obs.send('SetCurrentScene', {
      'scene-name': data
    })
    .then(()=>{
      setCurrentScene(data)
    })
    .then(()=>{
      obs.send('TakeSourceScreenshot',{
        'sourceName': wholeCurrentScene,
        'embedPictureFormat': "png",
        'width': 960,
        'height': 540
      }).then(e=>{
        setMedia(e.img)
      })
    })
  }

  const previewScreen = () => {
    obs.send('TakeSourceScreenshot',{
      'sourceName': wholeCurrentScene,
      'embedPictureFormat': "png",
      'width': 960,
      'height': 540
    })
    .then(e=>{
      setMedia(e.img)
    })
    .catch((err)=>console.log(err))

    setTimeout(previewScreen,100);
  }
 
  return (
    <div className="App">
      {!connection && <Log handleLog={handleLog}/>}
      {connection && 
      <PreviewScene 
      media={media}
      currentScene={previewScene}
      />}
      {connection && 
      <Scenes 
      // previewScene={previewScene}
      studioMode={studioMode}
      scenes={scenesList}
      currentScene={currentScene}
      handleSceneChange={handleSceneChange}/>}
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
