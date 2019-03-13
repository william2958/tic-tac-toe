import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieceComponent } from './piece/piece.component';
import { PlayerComponent } from './player/player.component';
import { TicComponent } from './tic/tic.component';
import {TicService} from './services/tic.service';

@NgModule({
    declarations: [
        AppComponent,
        PieceComponent,
        PlayerComponent,
        TicComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        TicService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
