import { Injectable } from '@angular/core';
import { Direction } from '../definitions/direction.type';
import { TileMatrix } from '../definitions/tile-matrix';
import { ScoreService } from '../shared/services/score.service';

@Injectable()
export class GameBoardService {
  constructor(private readonly scoreService: ScoreService) {}
  /**
   * Fill the board with two random tiles of value 2 or 4.
   * @param tiles the current game board as a list of tiles
   */
  public initializeBoard(tiles: number[]) {
    const newTiles = this.fillRandomTile(this.fillRandomTile(tiles));
    return newTiles;
  }

  /**
   * Returns true if there is no possible move on the board
   * @param tiles the current game board as a list of tiles
   */
  public checkGameOver(tiles: number[]): boolean {
    const tileMatrix = new TileMatrix(tiles);
    return tileMatrix.checkGameOver();
  }

  /**
   * Is called whenever the player makes a move. Calculates the new tiles based on
   * the current tiles and the players move.
   * @param tiles the current game board as a list of tiles
   * @param direction the direction that the player chose
   */
  public onMove(
    tiles: number[],
    direction: Direction
  ): number[] {
    // calculate new position of tiles
    const mergedMatrix = this.mergeMove(tiles, direction);
    let newTiles = mergedMatrix.toTiles();
    this.scoreService.score += mergedMatrix.mergers;
    // If the board has changed, generate a new tile.
    const boardChanged = JSON.stringify(newTiles) !== JSON.stringify(tiles);
    if (boardChanged) {
      newTiles = this.fillRandomTile(newTiles);
    }
    return newTiles;
  }

  private fillRandomTile(tiles: number[]): number[] {
    if (!tiles) {
      return [];
    }
    const freeTileIndices = tiles
      .map((t, i) => [t, i])
      .filter((x) => x[0] < 1)
      .map((x) => x[1]);
    if (freeTileIndices.length < 1) {
      console.log('GAME OVER!');
      return tiles;
    }
    const idx =
      freeTileIndices[Math.floor(Math.random() * freeTileIndices.length)];
    const val = this.get2or4atRandom();
    tiles[idx] = val;
    return tiles;
  }

  /**
   * Return 4 with a 10% chance and 2 with a 90% chance.
   */
  private get2or4atRandom() {
    return Math.random() < 0.1 ? 4 : 2;
  }

  private mergeMove(tiles: number[], direction: Direction): TileMatrix {
    const tileMatrix = new TileMatrix(tiles);
    tileMatrix.mergeMove(direction);
    return tileMatrix;
  }
}
