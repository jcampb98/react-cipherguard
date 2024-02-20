import './App.css';
import PasswordGenerator from './PasswordGenerator.jsx';
import ReasonsToUse from './ReasonsToUse.jsx';

function App() {
  return (
    <div className="app-container">
      <div className="centered">
        <PasswordGenerator />
        <hr/>
        <ReasonsToUse />
      </div>
    </div>
  );
}

export default App;