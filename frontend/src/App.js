import DetectFurnitures from "./DetectFurnitures";

function App() {
  const DF = new DetectFurnitures();

  return (
    <div className = "inputOutput">
      {DF.getInterface()}
    </div>
  );
}

export default App;
