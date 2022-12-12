import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { searchingForWinner as checkingForWinner } from './modules';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
      return (
        <button 
            className="square" 
            onClick={() => !this.props.isPressed&&this.props.squereClick()}
        >
            {this.props.value}
        </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squeres: Array(9).fill(null),
            squeresIsPressed: Array(9).fill(false),
            isTurnForX: true,
            xSquares: [],
            oSquares: [],
        }
    }

    handleClick(i) {
        const newSqueres = [...this.state.squeres]
        let xSquares
        let oSquares
        let isTurnForX = this.state.isTurnForX
        
        
        if (isTurnForX) {
            xSquares = [...this.state.xSquares, i]
            newSqueres[i] = 'X'
            this.props.searchForWin(xSquares, newSqueres[i])
            
            oSquares = [...this.state.oSquares]
        } else {
            oSquares = [...this.state.oSquares, i]
            newSqueres[i] = 'O'
            this.props.searchForWin(oSquares, newSqueres[i])
            
            xSquares = [...this.state.xSquares]
        }
        
        isTurnForX = !isTurnForX

        const newSqueresIsPressed = [...this.state.squeresIsPressed]
        newSqueresIsPressed[i] = true

        this.setState({ 
            squeres: newSqueres,
            squeresIsPressed: newSqueresIsPressed, 
            isTurnForX: isTurnForX, 
            xSquares: xSquares,
            oSquares: oSquares,
        })
        console.log(this.state);
    }

    renderSquareee(i) {
        return (
            <Square 
                value={this.state.squeres[i]} 
                isPressed={this.state.squeresIsPressed[i]}
                squereClick={() => this.handleClick(i)}
            />
        );
    }

    createNewGame() {
        this.setState({
            squeres: Array(9).fill(null),
            squeresIsPressed: Array(9).fill(false),
            isTurnForX: true,
            xSquares: [],
            oSquares: [],
        })
    }

render() {
    const status = this.props.isGameDone?'AND THE WINNER IS...':`Player's move: ${this.state.isTurnForX?'X':'O'}`;

    return (
    <div>
        <div className="status" >{status}</div>
        <div className="board-row">
        {this.renderSquareee.call(this, 0)}
        {this.renderSquareee(1)}
        {this.renderSquareee(2)}
        </div>
        <div className="board-row">
        {this.renderSquareee(3)}
        {this.renderSquareee(4)}
        {this.renderSquareee(5)}
        </div>
        <div className="board-row">
        {this.renderSquareee(6)}
        {this.renderSquareee(7)}
        {this.renderSquareee(8)}
        </div>
    </div>
    );
}
}

class Game extends React.Component {
    winningCombinations = [
        [0,1,2], [0,3,6], [0,4,8],
        [1,4,7],
        [2,4,6], [2,5,8],
        [3,4,5],
        [6,7,8],
    ]

    constructor(props) {
        super(props);
        this.state = {
            isGameDone: false,
            winner: null,
            turns: 0,
        };
        this.boardElement = React.createRef();
    }

    searchForWin(squareIndexes, turnFor) {        
        const isAWin = checkingForWinner(squareIndexes, this.winningCombinations, turnFor)// returns tuple with with first value that shows if player that have done a trun just won, and second value with this player symbol

        this.setState({turns: this.state.turns + 1})
        console.log(this.state.turns);

        if (isAWin[0]) {
            this.setState({
                isGameDone: true,
                winner: isAWin[1],
            })
        } else if (this.state.turns === 8) {
            this.setState({
                isGameDone: true,
                winner: 'draw',
            })
        } else if (this.state.turns > 9){
            throw Error('Something absolutelly wrong with this code')
        }

    }

render() {
    return (
    <div className="game">
        <div className="game-board" style={{pointerEvents: this.state.isGameDone&&"none"}}>
        <Board 
            ref={this.boardElement}
            searchForWin={ (squareIndexes, turnFor) => this.searchForWin(squareIndexes, turnFor) }
            isGameDone={this.state.isGameDone}
        />
        </div>
        <div className="game-info">
        <div style={{marginLeft: '-10px', display: 'inline'}}>{(this.state.winner==='draw')?"Oh... It's a draw":`PLAYER ${this.state.winner}`}</div>
        <div 
            style={{display: this.state.isGameDone?'inline':'none',  marginLeft: '20px', border: 'thick double ', cursor: 'pointer', padding:'5px' }}
            onClick={() => {
                this.boardElement.current.createNewGame()
                this.setState({
                    isGameDone: false,
                    winner: null,
                    turns: 0,
                })
            }}
        >
            NEW GAME
        </div>
        
        <ol>{this.state.turns}</ol>
        </div>
    </div>
    );
}
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
