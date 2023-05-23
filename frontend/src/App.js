import DetectFurnitures from "./DetectFurnitures";
import SearchFurnituresUI from "./SearchFurnituresUI"

function App() {
  const DF = new DetectFurnitures();

  return (
    <div className = "inputOutput">
      {DF.getInterface()}
      <SearchFurnituresUI/>
    </div>
  );
}

export default App;
