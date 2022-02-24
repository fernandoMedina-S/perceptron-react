import './App.scss';
import Cartesian from "./components/cartesian"
import DataInput from './components/DataInput/DataInput';
import MathPlot from "./components/MathPlot/MathPlot";
import DataLearning from './components/DataLearning';
import Learning from "./components/Learning";


function App() {
  return (
    <>
      <div className="main__container">
        <div className="main__cartesian">
          
          <MathPlot></MathPlot>
        </div>
        <div className="main__data-input">
          <DataLearning></DataLearning>
        </div>
      </div>
    </>
  );
}

export default App;
