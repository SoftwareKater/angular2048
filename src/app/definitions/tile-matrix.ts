import { Direction } from './direction.type';
import { MatrixIndex } from './matrix-index.interface';

/**
 * Models the tiles of the game board as a quadratic matrix.
 */
export class TileMatrix {
  /** The sum of all numbers that were merged */
  public mergers = 0;

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

  public checkGameOver() {
    const hasFreeTile = this.toTiles().find((v) => v === 0) === 0;
    if (hasFreeTile) {
      return false;
    }
    for (let row = 0; row < this.length; row++) {
      for (let column = 0; column < this.length; column++) {
        if (
          this.get({ row, column }) === this.get({ row: row + 1, column }) ||
          this.get({ row, column }) === this.get({ row: row - 1, column }) ||
          this.get({ row, column }) === this.get({ row, column: column + 1 }) ||
          this.get({ row, column }) === this.get({ row, column: column - 1 })
        ) {
          return false;
        }
      }
    }
    return true;
  }

  public getRow(index: number): number[] {
    if (index < 0 || index > this.matrix.length - 1) {
      return [];
    }
    return this.matrix[index];
  }

  public getColumn(index: number): number[] {
    if (index < 0 || index > this.matrix.length - 1) {
      return [];
    }
    const column = [];
    for (const row of this.matrix) {
      column.push(row[index]);
    }
    return column;
  }

  public get(index: MatrixIndex): number {
    if (
      index.row < 0 ||
      index.row > this.matrix.length - 1 ||
      index.column < 0 ||
      index.column > this.matrix.length - 1
    ) {
      return -1;
    }
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
    this.mergers += a + b;
  }

  // FIXME: left and right swipes are treated different that
  // up and down swipes. Align them; use the approach for left
  // and right swipes, its faster!

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
    this.matrix = this.matrix
      .map((row) => this.moveRow(row, 'left'))
      .map((movedRow) => this.mergeLeft(movedRow))
      .map((mergedRow) => this.moveRow(mergedRow, 'left'));
  }

  private moveRow(row: number[], direction: Direction): number[] {
    if (direction === 'up' || direction === 'down') {
      throw new Error('Rows can only be moved left or right');
    }
    const movedRow = row.filter((tileValue) => tileValue !== 0);
    while (movedRow.length !== this.length) {
      if (direction === 'left') {
        movedRow.push(0);
      }
      if (direction === 'right') {
        movedRow.unshift(0);
      }
    }
    return movedRow;
  }

  private mergeLeft(row: number[]): number[] {
    const mergedRow = row;
    for (let idx = 0; idx < row.length - 1; idx++) {
      if (row[idx] === row[idx + 1]) {
        const sum = row[idx] + row[idx + 1];
        mergedRow[idx] = sum;
        mergedRow[idx + 1] = 0;
        this.mergers += sum;
      } else {
        mergedRow[idx] = row[idx];
      }
    }
    return mergedRow;
  }

  private mergeRight(row: number[]): number[] {
    const mergedRow = row;
    for (let idx = row.length - 1; idx > 0; idx--) {
      if (row[idx] === row[idx - 1]) {
        const sum = row[idx] + row[idx - 1];
        mergedRow[idx] = sum;
        mergedRow[idx - 1] = 0;
        this.mergers += sum;
      } else {
        mergedRow[idx] = row[idx];
      }
    }
    return mergedRow;
  }

  private mergeMoveRight() {
    this.matrix = this.matrix
      .map((row) => this.moveRow(row, 'right'))
      .map((movedRow) => this.mergeRight(movedRow))
      .map((mergedRow) => this.moveRow(mergedRow, 'right'));
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
