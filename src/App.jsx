import './css/App.css';
import PasswordGenerator from './PasswordGenerator.jsx';
import CollapsibleList from './CollapsibleList.jsx';

function App() {
    return (
        <div className="app-container">
            <div className="centered">
                <PasswordGenerator />
                <div className="collapsible-container">
                    <CollapsibleList />
                </div>
            </div>
        </div>
    );
}

export default App;