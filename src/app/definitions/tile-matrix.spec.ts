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

  describe('mergeMove', () => {
    describe('left', () => {
      it('should merge 2,2,2,2 to 4,4,0,0 when mergeMove-ing left', () => {
        const tiles = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const expectedTiles = [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('left');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge 8,4,2,2 to 8,4,4,0 when mergeMove-ing left', () => {
        const tiles = [8, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const expectedTiles = [8, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('left');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge the most left numbers when mergeMove-ing left', () => {
        const tiles = [4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const expectedTiles = [8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('left');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });
    });

    describe('right', () => {
      it('should merge 2,2,2,2 to 0,0,4,4 when mergeMove-ing right', () => {
        const tiles = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const expectedTiles = [0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('right');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge 2,2,4,8 to 0,4,4,8 when mergeMove-ing right', () => {
        const tiles = [2, 2, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const expectedTiles = [0, 4, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('right');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge the most right numbers when mergeMove-ing right', () => {
        const tiles = [4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const expectedTiles = [0, 0, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('right');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });
    });

    describe('up', () => {
      it('should merge 2000|2000|2000|2000 to 4000|4000|0000|0000 when mergeMove-ing up', () => {
        const tiles = [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0];
        const expectedTiles = [4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('up');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge 8000|4000|2000|200 to 8000|4000|4000|0000 when mergeMove-ing up', () => {
        const tiles = [8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0];
        const expectedTiles = [8, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('up');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge the most top numbers when mergeMove-ing up', () => {
        const tiles = [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0];
        const expectedTiles = [8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('up');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });
    });

    describe('down', () => {
      it('should merge 2000|2000|2000|2000 to 0000|0000|4000|4000 when mergeMove-ing down', () => {
        const tiles = [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0];
        const expectedTiles = [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('down');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge 2000|2000|4000|8000 to 0000|4000|4000|8000 when mergeMove-ing down', () => {
        const tiles = [2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0];
        const expectedTiles = [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('down');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });

      it('should merge the most bottom numbers when mergeMove-ing down', () => {
        const tiles = [4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0];
        const expectedTiles = [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0];
        tileMatrix = new TileMatrix(tiles);
        tileMatrix.mergeMove('down');
        expect(tileMatrix.toTiles()).toEqual(expectedTiles);
      });
    });
  });
});
