import { Injectable } from '@angular/core';
import { GameState } from 'src/app/definitions/game-state.interface';

@Injectable({ providedIn: 'root' })
export class GameStateStorageService {
  private storageKey = 'game_state';

  constructor() {}

  public set(gameState: GameState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(gameState));
  }

  public get(): GameState {
    const storedState = localStorage.getItem(this.storageKey);
    let state: GameState;
    try {
      state = JSON.parse(storedState);
    } catch (err) {
      state = null;
    }
    return state;
  }
}
