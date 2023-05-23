import DetectFurnituresUI from "./DetectFurnituresUI";
import SearchFurnituresUI from "./SearchFurnituresUI"
import './App.css'

function App() {

  return (
    <div className = "container">
      <DetectFurnituresUI className = "item"/>
      <SearchFurnituresUI className = "item"/>
    </div>
  );
}

export default App;
