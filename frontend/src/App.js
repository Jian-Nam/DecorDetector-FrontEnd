
import UserInterface from './ui';
import ObjectDetection from './objectDetection'

const SERVER_URL = 'http://localhost:5000'
function App() {
  return (
    <div className = "inputOutput">
      <UserInterface/>
      <ObjectDetection/>
    </div>
  );
}

export default App;
