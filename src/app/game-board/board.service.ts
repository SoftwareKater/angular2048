import { Direction } from '../definitions/direction.type';
import { TileMatrix } from '../definitions/tile-matrix';

export class BoardService {
  /**
   * Fill the board with two random tiles of value 2 or 4.
   * @param tiles the current game board as a list of tiles
   */
  public initializeBoard(tiles: number[]) {
    const newTiles = this.fillRandomTile(this.fillRandomTile(tiles));
    return newTiles;
  }

  /**
   * Is called whenever the player makes a move. Calculates the new tiles based on
   * the current tiles and the players move.
   * @param tiles the current game board as a list of tiles
   * @param direction the direction that the player chose
   */
  public onMove(tiles: number[], direction: Direction): number[] {
    // calculate new position of tiles
    const mergeMovedTiles = this.mergeMove(tiles, direction);
    // If the board has changed, generate a new tile.
    const boardChanged =
      JSON.stringify(mergeMovedTiles) !== JSON.stringify(tiles);
    const filledTiles = boardChanged
      ? this.fillRandomTile(mergeMovedTiles)
      : mergeMovedTiles;
    return filledTiles;
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

  private get2or4atRandom() {
    return Math.random() < 0.5 ? 2 : 4;
  }

  private mergeMove(tiles: number[], direction: Direction): number[] {
    const tileMatrix = new TileMatrix(tiles);
    tileMatrix.mergeMove(direction);
    return tileMatrix.toTiles();
  }
}
