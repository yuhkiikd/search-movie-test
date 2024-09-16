import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { createContext, useState } from 'react';
import { Header } from './components/Header'

export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState('ja-JP')
  return (
    <LanguageContext.Provider value={{language, setLanguage}}>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
    </LanguageContext.Provider>
  );
}

export default App;
