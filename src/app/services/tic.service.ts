import { Injectable } from '@angular/core';
import {WinConditions} from '../tic/tic.component';

@Injectable()


export class TicService {

    constructor() { }

    // See if a player has won the game by checking a 9 length array of game pieces
    checkWin(pieces) {
        // Check for tie
        let tie = true;
        for (let i=0; i<9; i++) {
            if (pieces[i] == 0)
                tie = false;
        }
        if (tie)
            return WinConditions.TIE;

        // Check for winner, and if winner, return the player number on the winning tile
        for (let i=0; i<3; i++) {
            // Check for vertical win
            if (pieces[i] == pieces[i+3] && pieces[i+3] == pieces[i+6]) {
                return pieces[i];
            }
            // Check for horizontal win
            else if (pieces[i*3] == pieces[i*3+1] && pieces[i*3+1] == pieces[i*3+2]) {
                return pieces[i*3];
            }
            // Check for diagonal win
            else if (
                // && has precedence over || which allows us to check the diagonal equality first
                pieces[0] == pieces[4] && pieces[4] == pieces[8] ||
                pieces[2] == pieces[4] && pieces[4] == pieces[6]) {
                return pieces[4];
            }
        }
    }

}
