import { useState } from 'react';
import './PasswordGenerator.css';

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [message, setMessage] = useState({ text: "", type: "none" });
  const [options, setOptions] = useState({
    useSymbols: true,
    useNumbers: true,
    useLowerCase: true,
    useUpperCase: true,
  });

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (options.useSymbols) charset += "!@#$%^&*()";
    if (options.useNumbers) charset += "0123456789";
    if (options.useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(!charset) {
      setMessage({text: "Error: Invalid Selection, Please Select a checkboxes between Symbols to UpperCase", type: "error"});
      setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
        newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };
  
  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setMessage({text: "Password copied to clipboard!", type: "success"});
    setTimeout(() => setMessage(""), 2000); // Hide message after 2 seconds
  }

  const handleOptionChange = (option) => {
    setOptions(prevOption => ({
      ...prevOption,
      [option]: !prevOption[option],
    }));
  }

  return (
    <div className='container'>
      <h1 className='header'>
        CipherGuard
      </h1>
      <h3 className='subHeader'>
        Fortify Your Digital Defense: Unleash Ironclad Passwords with Our Secure Password Generator
      </h3>
      <div className='input-container'>
        <label className='label'>Password Length:</label>
        <input 
          className="input"
          type="number" 
          min="8" 
          max="32" 
          value={passwordLength} 
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>
      <div className="checkbox-container">
        <ul className='checkbox-unordered-list'>
          <li className='checkbox-list'>
            <label>
              <input 
                type="checkbox" 
                checked={options.useSymbols} 
                onChange={() => handleOptionChange('useSymbols')} 
              />
              Symbols
            </label>
          </li>
          <li className='checkbox-list'>
            <label>
              <input 
                type="checkbox" 
                checked={options.useNumbers} 
                onChange={() => handleOptionChange('useNumbers')} 
              />
              Numbers
            </label>
          </li>
          <li className='checkbox-list'>
            <label>
              <input 
                type="checkbox" 
                checked={options.useLowerCase} 
                onChange={() => handleOptionChange('useLowerCase')} 
              />
              LowerCase
            </label>
          </li>
          <li className='checkbox-list'>
            <label>
              <input 
                type="checkbox" 
                checked={options.useUpperCase} 
                onChange={() => handleOptionChange('useUpperCase')} 
              />
              UpperCase
            </label>
          </li>
        </ul>
      </div>
      <button className='button' onClick={generatePassword}>
        Generate Password
      </button>
      {password && (
        <div className='input-container'>
          <label className='label'>Generated Password:</label>
          <input type='text' value={password} readOnly className='input' />
          <button className='button' onClick={copyToClipboard}>Copy</button>
        </div>
      )}
      {message.type === "success" && (
        <p style={{color: "#008000", textAlign: "center"}}>{message.text}</p>
      )}
      {message.type === "error" && (
        <p style={{color: "#ff0000", textAlign: "center"}}>{message.text}</p>
      )}
    </div>
  );
}

export default PasswordGenerator;