import { Injectable } from '@angular/core';

@Injectable()


export class TicService {

    constructor() { }

    checkWin(pieces) {
        // Check for tie
        let tie = true;
        for (let i=0; i<9; i++) {
            if (pieces[i] == 0)
                tie = false;
        }
        if (tie)
            return 4;
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
                // && has precedence over ||
                pieces[0] == pieces[4] && pieces[4] == pieces[8] ||
                pieces[2] == pieces[4] && pieces[4] == pieces[6]) {
                return pieces[4];
            }
        }
    }

}
