import {Component, Input, OnInit} from '@angular/core';

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
            return "Waiting..."
        } else {
            if (this.winner && this.winner != this.playerNumber)
                return ":(";
            if (this.winner && this.winner == this.playerNumber) {
                if (this.playerNumber == 3)
                    return "Muahahaha!!!";
                if (!this.computer) {
                    return "Winner!"
                }
                return "Humans #1!";
            }
            if (!this.winner) {
                if (this.playerNumber == 3)
                    return "Calculating...";
                return "Your Turn!";
            }
        }
    }

}
