export class MazeSection {
public character: string;
public percolates: boolean;
public solid: boolean;

  constructor(character: string, percolates: boolean, solid: boolean){
    this.character = character;
    this.percolates = percolates;
    this.solid = solid;
  }
}
