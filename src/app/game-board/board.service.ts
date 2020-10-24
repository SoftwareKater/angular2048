export class BoardService {
  public initializeBoard(tileCount: number) {
    const idx = Math.floor(Math.random() * tileCount);
    const val = this.get2or4atRandom();
    return [idx, val];
  }

  public fillRandomTile(tiles: number[]): number[] {
    if (!tiles) {
      return [];
    }
    // FIXME
    const freeTileIndices = tiles.filter((t, i) => t < 1).map((t, i) => i);
    const idx =
      freeTileIndices[Math.floor(Math.random() * freeTileIndices.length)];
    const val = this.get2or4atRandom();
    tiles[idx] = val;
    return tiles;
  }

  public onMove(tiles: number[], direction: 'up' | 'down' | 'left' | 'right'): number[] {
    console.log(tiles);
    console.log(direction);
    const newTiles = this.fillRandomTile(tiles);
    return newTiles;
  }

  private get2or4atRandom() {
    return Math.random() < 0.5 ? 2 : 4;
  }
}
