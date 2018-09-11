import React, { Component } from "react";
import "./App.css";
import Ball from "./Ball";

class App extends Component {
  constructor(props) {
    super(props);
    this.sendNewData = this.sendNewData.bind(this)
    this.state = {
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        width: 500,
        height: 300,
        data: this.seedData()
    };
  }

  seedData() {
    const now = new Date();
    const arr = [];
    const maxLength = 10;
    const duration = 500;
    for (let i = 0; i < maxLength; i++) {
      arr.push({
        x: new Date(now.getTime() - (maxLength - i) * duration),
        y: Math.floor(Math.random() * (50 - 20) + 20)
      });
    }
    // console.log('arr: ', arr)
    return arr;
  }

  sendNewData(){
    this.setState({
      data: this.seedData()
    })
  }

  render() {
    const {margin, width, height, data} = this.state;
    // console.log('state now: ', this.state.data)
    return (
      <div>
        <button onClick={this.sendNewData} >new Data</button>
        <Ball margin={margin} width={width} height={height} data={data}/>
      </div>
    );
  }
}

export default App;
