import { Component, OnInit } from '@angular/core';
import {TicService} from '../services/tic.service';

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
        console.log(this.gameover);
        if (!this.computer) {
            this.pieces[pieceNumber] = this.turn;
            this.turn = this.turn == 1 ? 2 : 1;

            this.checkWin();
        } else {
            if (this.turn == 1) {
                this.pieces[pieceNumber] = this.turn;
                let computerPick = this.generateComputerPick();
                this.pieces[computerPick] = 2;
                this.checkWin();
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
            if (winner == 2 && this.computer) {
                this.gameover = 3;
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
        console.log(chosen);
        return chosen;
    }

}
