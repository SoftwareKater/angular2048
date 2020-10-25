import { Direction } from './direction.type';
import { MatrixIndex } from './matrix-index.interface';

/**
 * Models the tiles of the game board as a quadratic matrix.
 */
export class TileMatrix {
  private matrix: number[][];

  private mergeable: boolean[][];

  /**
   * Returns the number of rows.
   */
  public get length() {
    return this.matrix.length;
  }

  constructor(tiles: number[]) {
    this.matrix = [
      tiles.slice(0, 4),
      tiles.slice(4, 8),
      tiles.slice(8, 12),
      tiles.slice(12, 16),
    ];
    this.initializeMergeable();
  }

  public getRow(index: number): number[] {
    return this.matrix[index];
  }

  public getColumn(index: number): number[] {
    const column = [];
    for (const row of this.matrix) {
      column.push(row[index]);
    }
    return column;
  }

  public get(index: MatrixIndex): number {
    return this.matrix[index.row][index.column];
  }

  public mergeMove(direction: Direction) {
    switch (direction) {
      case 'up':
        this.mergeMoveUp();
        break;
      case 'down':
        this.mergeMoveDown();
        break;
      case 'left':
        this.mergeMoveLeft();
        break;
      case 'right':
        this.mergeMoveRight();
        break;
    }
    this.initializeMergeable();
  }

  /**
   * Returns a flattened version of the matix.
   */
  public toTiles(): number[] {
    const tiles = [];
    for (const row of this.matrix) {
      for (const el of row) {
        tiles.push(el);
      }
    }
    return tiles;
  }

  private initializeMergeable() {
    this.mergeable = this.matrix.map((row) => {
      return row.map((el) => true);
    });
  }

  private merge(from: MatrixIndex, to: MatrixIndex) {
    const a = this.matrix[from.row][from.column];
    const b = this.matrix[to.row][to.column];

    this.matrix[to.row][to.column] = a + b;
    this.matrix[from.row][from.column] = 0;
    this.mergeable[to.row][to.column] = false;
  }

  // FIXME: mergeMove methods can be simplified knowing that
  // merges can only appear, when the two tiles have the same value BEFORE the movement

  private mergeMoveDown() {
    for (let column = 0; column < this.length; column++) {
      for (let row = this.length - 1; row >= 0; row--) {
        if (this.get({ row, column }) !== 0) {
          for (let rowIdx = row; rowIdx < this.length - 1; rowIdx++) {
            const sourceTile = { row: rowIdx, column };
            const targetTile = { row: rowIdx + 1, column };
            this.moveOrMerge(sourceTile, targetTile);
          }
        }
      }
    }
  }

  private mergeMoveLeft() {
    for (let row = 0; row < this.length; row++) {
      for (let column = 0; column < this.length; column++) {
        if (this.get({ row, column }) !== 0) {
          for (let colIdx = column; colIdx >= 0; colIdx--) {
            const sourceTile = { row, column: colIdx + 1 };
            const targetTile = { row, column: colIdx };
            this.moveOrMerge(sourceTile, targetTile);
          }
        }
      }
    }
  }

  private mergeMoveRight() {
    for (let row = 0; row < this.length; row++) {
      for (let column = this.length - 1; column >= 0; column--) {
        if (this.get({ row, column }) !== 0) {
          for (let colIdx = column; colIdx < this.length; colIdx++) {
            const sourceTile = { row, column: colIdx - 1 };
            const targetTile = { row, column: colIdx };
            this.moveOrMerge(sourceTile, targetTile);
          }
        }
      }
    }
  }

  private mergeMoveUp() {
    for (let column = 0; column < this.length; column++) {
      for (let row = 0; row < this.length; row++) {
        if (this.get({ row, column }) !== 0) {
          for (let rowIdx = row; rowIdx > 0; rowIdx--) {
            const sourceTile = { row: rowIdx, column };
            const targetTile = { row: rowIdx - 1, column };
            this.moveOrMerge(sourceTile, targetTile);
          }
        }
      }
    }
  }

  private move(from: MatrixIndex, to: MatrixIndex) {
    const a = this.matrix[from.row][from.column];

    this.matrix[to.row][to.column] = a;
    this.matrix[from.row][from.column] = 0;
  }

  private moveOrMerge(sourceTile: MatrixIndex, targetTile: MatrixIndex): void {
    if (this.get(sourceTile) === 0) {
      return;
    }
    if (this.get(targetTile) === 0) {
      this.move(sourceTile, targetTile);
    }
    if (
      this.mergeable[targetTile.row][targetTile.column] &&
      this.mergeable[sourceTile.row][sourceTile.column] && // bad fix for bad implementation of mergeMove methods
      this.get(targetTile) === this.get(sourceTile)
    ) {
      this.merge(sourceTile, targetTile);
    }
  }
}
