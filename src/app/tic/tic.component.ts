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

    // An array of the game tiles and what pieces are on them
    pieces;
    // 0 for turn will mean player 1, 1 will mean player 2 or computer
    turn;
    // will be true if the game is over
    gameover;
    // Boolean to check if the computer is playing
    computer;

    ngOnInit() {
        this.resetGame();
    }

    pieceClicked(pieceNumber) {
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
        for (let i=0; i<3; i++) {
            if (this.pieces[i] == this.pieces[i+3] && this.pieces[i+3] == this.pieces[i+6]) {
                this.playerWon(this.pieces[i]);
            } else if (this.pieces[i*3] == this.pieces[i*3+1] && this.pieces[i*3+1] == this.pieces[i*3+2]) {
                this.playerWon(this.pieces[i*3]);
            } else if (
                // && has presidence over ||
                this.pieces[0] == this.pieces[4] && this.pieces[4] == this.pieces[8] ||
                this.pieces[2] == this.pieces[4] && this.pieces[4] == this.pieces[6]) {
                this.playerWon(this.pieces[4]);
            }
        }
    }

    playerWon(winner) {
        if (winner != 0) {
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
        return possibleValues[0];
    }

}
