export class BoardService {
  public initializeBoard(tileCount: number) {
    const idx = Math.floor(Math.random() * tileCount);
    const val = this.get2or4atRandom();
    return [idx, val];
  }

  public fillRandomTile(tiles: number[]) {
    const freeTileIndices = tiles.filter((t) => t < 1).map((t, i) => i);
    const idx =
      freeTileIndices[Math.floor(Math.random() * freeTileIndices.length)];
    const val = this.get2or4atRandom();
    return [idx, val];
  }

  private get2or4atRandom() {
    return Math.random() < 0.5 ? 2 : 4;
  }
}
