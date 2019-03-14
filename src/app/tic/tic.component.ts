import { Component, OnInit } from '@angular/core';
import {TicService} from '../services/tic.service';

export enum WinConditions {
    NO_WIN = 0,
    PLAYER1 = 1,
    PLAYER2 = 2,
    COMPUTER = 3,
    TIE = 4
}

@Component({
    selector: 'app-tic',
    templateUrl: './tic.component.html',
    styleUrls: ['./tic.component.css']
})
export class TicComponent implements OnInit {

    constructor(
        private ticService: TicService
    ) { }

    pieces;
    // 0 for turn will mean player 1, 1 will mean player 2 or computer
    currentPlayer;
    // will be true if the game is over
    gameState;
    isComputer;

    constructor() { }

    ngOnInit() {
        this.resetGame();
    }

    setPiece(pieceNumber) {

        if (this.pieces[pieceNumber] != 0)
            return;

        if (!this.isComputer) {
            // Set the chosen piece
            this.pieces[pieceNumber] = this.currentPlayer;
            // Toggle the player turn
            this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;

            this.playerWon();
        } else {
            // Only if it is the players turn
            // (player cannot double click a tile while computer is calculating)
            if (this.currentPlayer == 1) {
                this.pieces[pieceNumber] = this.currentPlayer;
                this.playerWon();
                if (this.gameState == 0) {
                    this.currentPlayer = 2;
                    let computerPick = this.generateComputerPick();
                    setTimeout(() => {
                        this.pieces[computerPick] = 2;
                        this.currentPlayer = 1;
                        this.playerWon();
                    }, 400);
                }
            }
        }
    }

    resetGame() {
        // Set the game variables back to their initial states
        this.pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentPlayer = 1;
        this.gameState = 0;
    }

    playerWon() {
        // Check if a player won, and if so, call playerWon with the winner
        let winner = this.ticService.getWinner(this.pieces.slice(0));
        // Winner is null is there are no wins or 0 if no player has won yet
        if (winner && winner != 0) {
            this.currentPlayer = 0;
            if (winner == 2 && this.isComputer) {
                this.gameState = WinConditions.COMPUTER;
            } else {
                this.gameState = winner;
            }
        }
    }

    playCPU(computer) {
        // Allow the user to toggle between an AI opponent or two players
        this.resetGame();
        this.isComputer = computer;
    }

    generateComputerPick() {
        // Create a computer random pick by finding all the possible moves
        let possibleValues = [];
        for (let i=0; i<9; i++) {
            if (this.pieces[i] == 0) {
                possibleValues.push(i);
            }
        }
        return possibleValues[Math.floor(Math.random() * Math.floor(possibleValues.length))];
    }

}
