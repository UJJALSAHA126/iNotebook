import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
// import Alert from './components/Alert';

// import tokenContext from './context/token/tokenContext';


function App() {
  // const context = useContext(tokenContext);
  // console.log('context', context)
  // const [token, setToken] = useState(context.token);

  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          {/* <Alert/> */}

          <div className="container">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

            </Routes>
          </div>

        </Router>

      </NoteState >
    </>
  );
}

export default App;
