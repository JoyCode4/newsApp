import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize=10;
  API_KEY="3daf10a0d3b74ee7b53a38107567a455";
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<News key={"general"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"general"}/>}/>
            <Route path='/business' element={<News key={"business"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"business"}/>}/>
            <Route path='/entertainment' element={<News key={"entertainment"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"entertainment"}/>}/>
            {/* <Route path='/general' element={<News key={"genera"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"general"}/>}/> */}
            <Route path='/health' element={<News key={"health"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"health"}/>}/>
            <Route path='/science' element={<News key={"science"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"science"}/>}/>
            <Route path='/sports' element={<News key={"sports"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"sports"}/>}/>
            <Route path='/technology' element={<News key={"technology"} pageSize={this.pageSize}  API_KEY={this.API_KEY} country={"in"} category={"technology"}/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
