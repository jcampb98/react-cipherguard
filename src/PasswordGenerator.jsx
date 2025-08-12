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

  const CHARSET_OPTIONS = {
    symbols: "!@#$%^&*()",
    numbers: "0123456789",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }

  const MESSAGE_TIMEOUT = 10000; // 10 seconds

  const buildCharset = (options) => {
    let charset = "";

    if (options.useSymbols) charset += CHARSET_OPTIONS.symbols;
    if (options.useNumbers) charset += CHARSET_OPTIONS.numbers;
    if (options.useLowerCase) charset += CHARSET_OPTIONS.lowercase;
    if (options.useUpperCase) charset += CHARSET_OPTIONS.uppercase;

    return charset;
  }

  const generateSecureRandomIndex = (max) => {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    return randomArray[0] % max;
  }

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(""), MESSAGE_TIMEOUT);
  };

  const generatePassword = () => {
    let newPassword = "";
    
    if(passwordLength < 10) {
      showMessage("Password must be at least 10 characters long", "error");
      return;
    }

    const charset = buildCharset(options);

    if (!charset) {
      showMessage("Please select at least one character type (symbols, numbers, lowercase, or uppercase)", "error");
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = generateSecureRandomIndex(charset.length);
        newPassword += charset.charAt(randomIndex);
    }

    setPassword(newPassword);
  };
  
  const copyToClipboard = () => {
    // This get's the text field
    const copyText = document.createElement("textarea");

    //This gets the copyText value from the string state
    copyText.value = password;

    // Selects the text field
    copyText.select();

    // Copy's the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    showMessage("Password copied to clipboard!", "success");
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