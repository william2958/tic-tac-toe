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
    turn;
    // will be true if the game is over
    gameover;
    computer;

    constructor() { }

    ngOnInit() {
        this.resetGame();
    }

    pieceClicked(pieceNumber) {

        if (this.pieces[pieceNumber] != 0)
            return;

        if (!this.computer) {
            // Set the chosen piece
            this.pieces[pieceNumber] = this.turn;
            // Toggle the player turn
            this.turn = this.turn == 1 ? 2 : 1;

            this.checkWin();
        } else {
            // Only if it is the players turn
            // (player cannot double click a tile while computer is calculating)
            if (this.turn == 1) {
                this.pieces[pieceNumber] = this.turn;
                this.checkWin();
                if (this.gameover == 0) {
                    this.turn = 2;
                    let computerPick = this.generateComputerPick();
                    setTimeout(() => {
                        this.pieces[computerPick] = 2;
                        this.turn = 1;
                        this.checkWin();
                    }, 400);
                }
            }
        }
    }

    resetGame() {
        this.pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.turn = 1;
        this.gameover = 0;
    }

    checkWin() {
        let winner = this.ticService.checkWin(this.pieces.slice(0));
        this.playerWon(winner);
    }

    playerWon(winner) {
        // Winner is null is there are no wins or 0 if no player has won yet
        if (winner && winner != 0) {
            this.turn = 0;
            if (winner == 2 && this.computer) {
                this.gameover = WinConditions.COMPUTER;
            } else {
                this.gameover = winner;
            }
        }
    }

    playCPU(computer) {
        this.resetGame();
        this.computer = computer;
    }

    generateComputerPick() {
        let possibleValues = [];
        for (let i=0; i<9; i++) {
            if (this.pieces[i] == 0) {
                possibleValues.push(i);
            }
        }
        let chosen = possibleValues[Math.floor(Math.random() * Math.floor(possibleValues.length))];
        return chosen;
    }

}
