import React, { useState } from 'react';
import Square from './Square';


export default function Board(props) {

    const intialSquares = Array(9).fill(null);
    const [squares, setSquares] = useState(intialSquares);
    const [isXNext, setXisNext] = useState(true);
    const [countSquares, setCount] = useState(false);
    const allFull = false;

    const handleClick = (i) => {
        setCount(countSquares + 1);
        // 1. make a copy of squares state array
        const newSquares = [...squares];
        const winnerDeclared = Boolean(calculateWinner(newSquares));
        const squareFilled = Boolean(newSquares[i]);
        if (winnerDeclared || squareFilled) {
            return;
        }
        // 2. mutate the copy, setting i-th element to 'X'
        newSquares[i] = isXNext ? 'X' : 'O';
        // 3. call setSquare with the mutated copy 
        console.log(countSquares);
        setSquares(newSquares);
        setXisNext(!isXNext);

    };




    const renderSquare = (i) => {
        return (
            <Square value={squares[i]} onClickEvent={() => handleClick(i)}>

            </Square>
        );
    };

    const winner = calculateWinner(squares);
    const res = winner ? `Winner is ${winner}` : 'Its a tie !!';
    // const status = `Next player : ${isXNext ? 'X' : 'O'}`;
    // const showResult = (countSquares == (intialSquares.length) ? <Result value={res} /> : null);

    const showResult = ((countSquares == intialSquares.length) || winner);
    const status = showResult ? <Result value={res} /> : `Next player : ${isXNext ? 'X' : 'O'}`;

    return (
        <>
            <div>
                <div className="row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <div className="who-next">{status}</div>
        </>
    )
}

const Result = (props) => (
    <div>
        <div id="results">
            {props.value}
        </div>
        <button className="game-btn" onClick={gameReload}>Start Over</button>
    </div>
)

function calculateWinner(squares) {
    const winninLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let line of winninLines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function gameReload() {
    window.location.reload(false);
}