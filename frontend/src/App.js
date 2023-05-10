import DetectFurnituresUI from "./DetectFurnituresUI";
import DetectFurnitures from "./DetectFurnitures";

function App() {
  const DF = new DetectFurnitures();

  return (
    <div className = "inputOutput">
      {/* <DetectFurnituresUI/> */}
      {DF.interface}
    </div>
  );
}

export default App;
