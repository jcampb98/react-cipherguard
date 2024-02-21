import './App.css';
import PasswordGenerator from './PasswordGenerator.jsx';
import CollapsibleList from './CollapsibleList.jsx';

function App() {
  return (
    <div className="app-container">
      <div className="centered">
        <PasswordGenerator />
        <hr className='line-break'/>
        <CollapsibleList />
      </div>
    </div>
  );
}

export default App;