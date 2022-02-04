import './App.scss';
import Cartesian from "./components/cartesian"
import DataInput from './components/DataInput/DataInput';


function App() {
  return (
    <>
      <div className="main__container">
        <div className="main__cartesian">
          <Cartesian></Cartesian>
        </div>
        <div className="main__data-input">
          <DataInput></DataInput>
        </div>
      </div>
    </>
  );
}

export default App;
