import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { MazeComponent } from './maze/maze.component';

const appRoutes: Routes = [
  { path: 'maze', component: MazeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
