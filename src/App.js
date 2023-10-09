import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
// *************** IMPORTANT NOTE ***************
// it cannot deploy properly because of the API can not all cors to render the API data

const App =() => {
  const pageSize=10;
  // API_KEY="5fd178daa9d84d87a0f119cb25dadff8";
  const API_KEY=process.env.REACT_APP_NEWS_API.toString();

  const [progress,setProgress] = useState(0);
  return (
    <div>
      <Router>
      <Navbar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} key={"general"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"general"}/>}/>
          <Route path='/business' element={<News setProgress={setProgress} key={"business"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"business"}/>}/>
          <Route path='/entertainment' element={<News setProgress={setProgress} key={"entertainment"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"entertainment"}/>}/>
          {/* <Route path='/general' element={<News setProgress={setProgress} key={"genera"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"general"}/>}/> */}
          <Route path='/health' element={<News setProgress={setProgress} key={"health"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"health"}/>}/>
          <Route path='/science' element={<News setProgress={setProgress} key={"science"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"science"}/>}/>
          <Route path='/sports' element={<News setProgress={setProgress} key={"sports"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"sports"}/>}/>
          <Route path='/technology' element={<News setProgress={setProgress} key={"technology"} pageSize={pageSize}  API_KEY={API_KEY} country={"in"} category={"technology"}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
