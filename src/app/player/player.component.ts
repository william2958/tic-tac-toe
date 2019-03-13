import {Component, Input, OnInit} from '@angular/core';
import {WinConditions} from '../tic/tic.component';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {

    @Input() playerNumber;
    @Input() turn;
    @Input() winner;
    @Input() computer;

    constructor() { }

    ngOnInit() {
    }

    generateText() {
        if (!this.turn && !this.winner) {
            // Not this player's turn and the game has not ended
            return "Waiting..."
        } else {
            if (this.winner == WinConditions.TIE) {
                // If it's a tie display nothing
                return " "
            }
            if (this.winner && this.winner != this.playerNumber)
                // If there is a winner and it is not this player
                return ":(";
            if (this.winner && this.winner == this.playerNumber) {
                // If there is a winner and it is this player
                if (this.playerNumber == WinConditions.COMPUTER)
                    return "Muahahaha!!!";
                if (!this.computer) {
                    return "Winner!"
                }
                // If the winner is player 1 against a computer
                return "Humans #1!";
            }
            if (!this.winner) {
                if (this.playerNumber == WinConditions.COMPUTER)
                    return "Calculating...";
                // If it is this player's turn
                return "Your Turn!";
            }
        }
    }

}
