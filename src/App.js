import './App.css';
import Log from './Log';
import react,{useState} from 'react';
import Controller from './Controller';

function App() {

  const [connection, setConnection] = useState(true)

  return (
    <div className="App">
      {!connection && <Log/>}
      <Controller/>
    </div>
  );
}

export default App;
