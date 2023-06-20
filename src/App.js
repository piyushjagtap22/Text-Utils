import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  

  const [mode, setMode] = useState('light');

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const removeBodyClasses = ()=> {
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('bg-danger')
    document.body.classList.remove('bg-success')
    document.body.classList.remove('bg-info')
  }
  
  const toggleMode = (cls) => {
    console.log(cls)
    console.log(mode)
    
    removeBodyClasses();
    document.body.classList.add('bg-'+cls);
    if (cls !== 'light' && cls!=='dark'){
      setMode(mode ==='light'?'dark':'light');
      document.body.style.backgroundColor = 'white'
      showAlert(`${cls==='light'?'light': cls === 'dark'? 'dark': cls === 'danger'? 'Red' : cls==='success'?'Green':cls === 'info'?'Cyan' : cls === 'primary'?'Blue':'Yellow'} ${mode === 'light'?'dark':'light'} mode Enabled`, "success")
      document.title = 'Text Utils - Light'
    }
    else if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'dimgrey'
      document.body.style.content = 'black'
      showAlert("Dark mode Enabled", "success")
      document.title = 'Text Utils - Dark'
    }
    else if (mode === 'dark'){
      setMode('light');
      document.body.style.backgroundColor = 'white'
      showAlert("Light mode Enabled", "success")
      document.title = 'Text Utils - Light'
    }
    
  }


  return (
    <>
      <Router>

        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

      </Router >

    </>
  );
}

export default App;
