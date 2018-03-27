import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent {
  size = 11;
  maze: string[][] = new Array();
  mazeString: string[] = new Array();
  currentX: number;
  currentY: number;

  constructor() {
  }

  /************
   FUNCTIONS
   ************/

  // INITIALIZEMAZE || create a maze where every node is filled with *
  initializeMaze() {
    for (let i = 0; i < this.size; i++) {
      this.maze.push([]);
      for (let j = 0; j < this.size; j++) {
        this.maze[i].push('*');
      }
    }
  }

  // CREATEMAZE || creates the maze using the Hunt-and-Kill algorithm
  createMaze() {
    let x = 1;
    let y = this.size - 1;
    let loop = true;
    this.maze[x][y] = ' ';
    this.maze[x][y - 1] = ' ';

    while (loop) {
      x = 1;
      y = 1;

      // Scan operation
      while (true) {
        if (this.maze[x][y] === '*' && this.isIsland(x, y)) {
          if (x !== this.size - 2) {
            if (this.maze[x + 2][y] === ' ') {
              this.maze[x + 1][y] = ' ';
              break;
            }
          }
          if (x >= 3) {
            if (this.maze[x - 2][y] === ' ') {
              this.maze[x - 1][y] = ' ';
              break;
            }
          }
          if (y + 2 <= this.size - 2) {
            if (this.maze[x][y + 2] === ' ') {
              this.maze[x][y + 1] = ' ';
              break;
            }
          }
          if (y >= 3) {
            if (this.maze[x][y - 2] === ' ') {
              this.maze[x][y - 1] = ' ';
              break;
            }
          }
        }
        x++;

        if (x >= this.size - 1) {
          x = 1;
          y++;
        }
        if (y >= this.size - 1) {
          loop = false;
          break;
        }
      }

      this.maze[x][y] = ' ';

      // Create Route
      while (!this.isDeadEnd(x, y)) {
        const direction = this.getDirection();

        switch (direction) {
          case 0:
            if (x - 2 >= 1 && this.isIsland(x - 2, y)) {
              this.maze[x - 1][y] = ' ';
              this.maze[x - 2][y] = ' ';
              x -= 2;
            }
            break;
          case 1:
            if (y - 2 >= 1 && this.isIsland(x, y - 2)) {
              this.maze[x][y - 1] = ' ';
              this.maze[x][y - 2] = ' ';
              y -= 2;
            }
            break;
          case 2:
            if (y + 2 <= this.size - 2 && this.isIsland(x, y + 2)) {
              this.maze[x][y + 1] = ' ';
              this.maze[x][y + 2] = ' ';
              y += 2;
            }
            break;
          case 3:
            if (x + 2 <= this.size - 2 && this.isIsland(x + 2, y)) {
              this.maze[x + 1][y] = ' ';
              this.maze[x + 2][y] = ' ';
              x += 2;
            }
            break;
        }
      }
    }
    this.maze[this.size - 2][0] = 'X';
    this.maze[1][this.size - 1] = 'O';
    this.currentX = 1;
    this.currentY = this.size - 1;
  }

  // GETDIRECTION || Returns a random number between 0 and 4 (A,W,S,D)
  getDirection() {
    return Math.floor(Math.random() * Math.floor(4));
  }

  // DEADEND || checks if the current node is a dead end
  isDeadEnd(x: number, y: number) {
    if (x + 2 <= this.size - 2 && this.maze[x + 2][y] === '*' && this.isIsland(x + 2, y)) {
      return false;
    }
    if (x - 2 >= 1 && this.maze[x - 2][y] === '*' && this.isIsland(x - 2, y)) {
      return false;
    }
    if (y + 2 <= this.size - 2 && this.maze[x][y + 2] === '*' && this.isIsland(x, y + 2)) {
      return false;
    }
    return !(y - 2 >= 1 &&  this.maze[x][y - 2] === '*' && this.isIsland(x, y - 2));
  }

  // ISISLAND || checks if a position is surrounded by 'walls'
  isIsland(x: number, y: number) {
    return (this.maze[x + 1][y] === '*' && this.maze[x - 1][y] === '*' && this.maze[x][y + 1] === '*' && this.maze[x][y - 1] === '*');
  }

  // MOVE
  move(direction) {
    switch (direction) {
      case 'A':
      case 'a':
        if (this.maze[this.currentX - 1][this.currentY] === ' ') {
          this.maze[this.currentX][this.currentY] = ' ';
          this.maze[this.currentX - 1][this.currentY] = 'O';
          this.currentX--;
        }
        break;
      case 'W':
      case 'w':
        if (this.maze[this.currentX][this.currentY - 1] === ' ') {
          this.maze[this.currentX][this.currentY] = ' ';
          this.maze[this.currentX][this.currentY - 1] = 'O';
          this.currentY--;
        }
        break;
      case 'S':
      case 's':
        if (this.maze[this.currentX][this.currentY + 1] === ' ') {
          this.maze[this.currentX][this.currentY] = ' ';
          this.maze[this.currentX][this.currentY + 1] = 'O';
          this.currentY++;
        }
        break;
      case 'D':
      case 'd':
        if (this.maze[this.currentX + 1][this.currentY] === ' ') {
          this.maze[this.currentX][this.currentY] = ' ';
          this.maze[this.currentX + 1][this.currentY] = 'O';
          this.currentX++;
        }
        break;
    }
    this.stringifyMaze();
  }

  // STRINGIFYMAZE || sets up the maze as one solid text string
  stringifyMaze() {
    this.mazeString = new Array();
    for (let i = 0; i < this.size; i++) {
      this.mazeString[i] = '';
      for (let j = 0; j < this.size; j++) {
        this.mazeString[i] += this.maze[i][j];
      }
    }
  }

  // NEWMAZE || sets the maze to a new array and creates a new maze in it
  newMaze() {
    this.maze = new Array();
    this.initializeMaze();
    this.createMaze();
    this.stringifyMaze();
  }
}
