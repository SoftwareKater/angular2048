import { TileMatrix } from './tile-matrix';

describe('TileMatrix', () => {
  let tileMatrix: TileMatrix;

  it('should create', () => {
    tileMatrix = new TileMatrix([]);
    expect(tileMatrix).toBeTruthy();
  });

  it('should get', () => {
    const tiles = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tileMatrix = new TileMatrix(tiles);
    expect(tileMatrix.get({ row: 0, column: 0 })).toBe(1);
    expect(tileMatrix.get({ row: 3, column: 2 })).toBe(0);
  });
});
