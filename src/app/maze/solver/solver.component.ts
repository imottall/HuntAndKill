import {Component, Input, OnInit} from '@angular/core';
import {MazeSection} from '../../../models/maze-section';

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit {
  @Input() maze: MazeSection[][];

  constructor() { }

  ngOnInit() {
  }

}
