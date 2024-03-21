import React from 'react';
import LoginPage from './LoginPage';
import './App.css';

function App() {
  const handleLogin = (credentials) => {
    // This is where you would handle the login logic
    console.log('Logging in with credentials:', credentials);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
      </header>
      <div className="login-container">
        <LoginPage onLogin={handleLogin} />
      </div>
    </div>
  );
}

export default App;
