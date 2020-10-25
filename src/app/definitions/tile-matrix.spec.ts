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

  describe('tile movement', () => {
    it('should move all the way when no other tiles in direction', () => {
      const tiles = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      tileMatrix = new TileMatrix(tiles);
      tileMatrix.mergeMove('right');
      expect(tileMatrix.get({ row: 0, column: 0 })).toBe(0);
      expect(tileMatrix.get({ row: 0, column: 3 })).toBe(2);
    });

    it('should move the whole row to the right', () => {
      const tiles = [2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      tileMatrix = new TileMatrix(tiles);
      tileMatrix.mergeMove('right');
      expect(tileMatrix.get({ row: 0, column: 0 })).toBe(0);
      expect(tileMatrix.get({ row: 0, column: 1 })).toBe(0);
      expect(tileMatrix.get({ row: 0, column: 2 })).toBe(2);
      expect(tileMatrix.get({ row: 0, column: 3 })).toBe(8);
    });

    it('should move the whole row to the left', () => {
      const tiles = [0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      tileMatrix = new TileMatrix(tiles);
      tileMatrix.mergeMove('left');
      expect(tileMatrix.get({ row: 0, column: 0 })).toBe(2);
      expect(tileMatrix.get({ row: 0, column: 1 })).toBe(8);
      expect(tileMatrix.get({ row: 0, column: 2 })).toBe(0);
      expect(tileMatrix.get({ row: 0, column: 3 })).toBe(0);
    });
  });

  describe('tile merges', () => {
    it('should merge 2,2,2,2 to 4,4,0,0 when mergeMove-ing left', () => {
      const tiles = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      tileMatrix = new TileMatrix(tiles);
      tileMatrix.mergeMove('left');
      expect(tileMatrix.get({ row: 0, column: 0 })).toBe(4);
      expect(tileMatrix.get({ row: 0, column: 1 })).toBe(4);
      expect(tileMatrix.get({ row: 0, column: 2 })).toBe(0);
      expect(tileMatrix.get({ row: 0, column: 3 })).toBe(0);
    });

    it('should merge 8,4,2,2 to 8,4,4,0 when mergeMove-ing left', () => {
      const tiles = [8, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      tileMatrix = new TileMatrix(tiles);
      tileMatrix.mergeMove('left');
      expect(tileMatrix.get({ row: 0, column: 0 })).toBe(8);
      expect(tileMatrix.get({ row: 0, column: 1 })).toBe(4);
      expect(tileMatrix.get({ row: 0, column: 2 })).toBe(4);
      expect(tileMatrix.get({ row: 0, column: 3 })).toBe(0);
    });
  });
});
