import React, { Component } from 'react';
import './tictactoe.css';
import circle_pngi from '../Assests/circle.png';
import cross_pngi from '../Assests/cross.png';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      gino: 0,
      harbo: 0,
      lock: false,
      saved: false,
      data: ["", "", "", "", "", "", "", "", ""],
      title: "Lets play a game of TicTacToe",
      titli: 0,
      stopGame: false
    };
  }

  toggle = (e,num) => {
    console.log("Clicked box:", num);
    const { lock, count, data, stopGame } = this.state;
    if (stopGame) return;
    else if (lock) {
      return;
    } else if (count % 2 === 0) {
        
      data[num] = "x";
      this.setState(prevState => ({ count: prevState.count + 1, data }));
    } else {
        
      data[num] = "o";
      this.setState(prevState => ({ count: prevState.count + 1, data }));
    }
    this.checkwin();
  };

  checkwin = () => {
    const { data, lock } = this.state;
    const winningConditions = [
      [0, 1, 2], [0, 3, 6], [0, 4, 8],
      [1, 4, 7], [2, 5, 8], [2, 4, 6],
      [3, 4, 5], [6, 7, 8]
    ];
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        this.jeetgya(data[c]);
        return;
      }
    }
    if (data.every(val => val !== "")) {
      this.setState({ title: "MATCH DRAW", stopGame: true });
    }
  };

  jeetgya = (winner) => {
    const { lock,title } = this.state;
    this.setState({ lock: true });
    if (winner === "x") {
this.setState({title:"player 1  wins"})
      this.setState(prevState => ({ gino: prevState.gino + 1, stopGame: true }));
    } else if (winner === "o") {
        this.setState({title:"player 2  wins"})
      this.setState(prevState => ({ harbo: prevState.harbo + 1, stopGame: true }));
    }
  };

  reset = () => {
    const data = Array(9).fill("");
    this.setState({ data, lock: false, title: "NEW TIC TAC TOE GAME", stopGame: false });
  };

  handleButtonClick = () => {
    this.setState({ saved: true });
  };

  render() {
    const { gino, harbo, saved, title, data } = this.state;

    return (
      <div className='container'>
        <h1 className="radhe">{title}</h1>
        <div>
          <label htmlFor="harbala">Player 1 Name is :</label>
          <input type="text" id="harbala" disabled={saved} placeholder="enter name 1" />

          <label htmlFor="harbala">Player 2 Name is :</label>
          <input type="text" id="harbala" disabled={saved} placeholder="enter name 2" />
          <button className="tota" onClick={this.handleButtonClick}>Submit</button>
        </div>
        <div>
          <p className="goli">Player 1 : {gino}</p>
          <p className="toli">Player 2 : {harbo}</p>
        </div>

        <div className="board">
          {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((row) => (
            <div className="">{
                row.map(num => (
                    <div key={num} className="boxes" onClick={(e) => this.toggle(e,num)}>
                        {data[num] === "x" && <img src={cross_pngi} alt="Cross" />}
                        {data[num] === "o" && <img src={circle_pngi} alt="Circle" />}
                       
                    </div>
                ))
            }</div>
          ))}
        </div>
        

        <button className="reset" onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default TicTacToe; 