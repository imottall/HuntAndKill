import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { MazeComponent } from './maze/maze.component';
import { SolverComponent } from './maze/solver/solver.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeComponent,
    SolverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
