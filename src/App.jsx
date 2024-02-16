import { useState } from 'react';
import Dashboard from './components/dashboard.jsx'
import Navbar from './components/navbar.jsx';
import Redaction from './components/redaction.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Alert from './components/alert.jsx';
// eslint-disable-next-line


function App() {

  //state for the alert
  const [alert, setAlert] = useState(null);

  //showing the alert below the navbar
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }


  return (
    <div className="App">
       <Router>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert}/>
              <Routes>
                <Route excat path='/' element={<Dashboard/>} />
                <Route excat path='/login' element={<Login showAlert={showAlert}/>} />
                <Route excat path='/redaction' element={<Redaction />} />
                <Route excat path='/signup' element={<SignUp showAlert={showAlert}/>} />
              </Routes>
        </Router>
    </div>
  );
}

export default App;
