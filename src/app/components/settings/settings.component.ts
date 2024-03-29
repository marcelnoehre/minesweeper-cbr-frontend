import { Component, OnInit, HostListener } from '@angular/core';
import { filter, Observable, pluck } from 'rxjs';
import { DifficultyEnum } from 'src/app/enum/difficulty';
import { ResultEnum } from 'src/app/enum/result';
import { ActionService } from 'src/app/services/action-service';
import { ApiService } from 'src/app/services/api.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { GameStatsService } from 'src/app/services/gamestats.service';
import { PatternService } from 'src/app/services/pattern.service';
import { StorageService } from 'src/app/services/storage.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private _difficultyChange$!: Observable<string>;
  private _gameTime!: number;
  responsiveClass!: string;
  revealedCells!: number;
  totalCells!: number;
  remainingFlags!: number;
  mineAmount!: number;
  isFlagMode!: boolean;
  isFlagPermanently!: boolean;
  difficulty!: string;
  difficulties: string[] = [DifficultyEnum.beginner, DifficultyEnum.advanced, DifficultyEnum.expert];
  minutes: string = '00';
  seconds: string = '00';

  constructor(
    private _storage: StorageService,
    private _gameStats: GameStatsService,
    private _action: ActionService,
    private _timer: TimerService,
    private _breakpoints: BreakpointService,
    private _pattern: PatternService,
    private _api: ApiService
  ) {}

  ngOnInit(): void {
    this._difficultyChange$ = this._storage.storageChange$.pipe(
      filter(({ key }) => key === "difficulty"),
      pluck("id")
    );
    this._difficultyChange$.subscribe(newDifficulty => {
      this._timer.stop();
      this.difficulty = newDifficulty;
    });
    this.difficulty = this._storage.getSessionEntry('difficulty');
    this.setDifficulty(this._storage.getSessionEntry('difficulty'));
    this._gameStats.gameRunning$.subscribe((gameRunning: boolean) => {
      if(gameRunning) {
        this._timer.start();
      } else {
        this._timer.stop();
      }
    });
    this._breakpoints.responsiveClass$.subscribe((responsiveClass: string) => {
      this.responsiveClass = responsiveClass;
    });
    this._timer.gameTime$.subscribe((gameTime: number) => {
      this._gameTime = gameTime;
      let minutes = Math.floor(this._gameTime / 60);
      let seconds = this._gameTime % 60;
      this.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      this.seconds = seconds < 10 ? '0' + seconds : '' + seconds; 
    });
    this._gameStats.revealedCells$.subscribe((revealedCells: number) => {
      if(revealedCells == this.totalCells - this.mineAmount) {
        this._gameStats.setGameRunning(false);
        this._action.openDialog(ResultEnum.win);
      }
      this.revealedCells = revealedCells;
    });
    this._gameStats.totalCells$.subscribe((totalCells: number) => {
      this.totalCells = totalCells;
    });
    this._gameStats.remainingFlags$.subscribe((remainingFlags: number) => {
      this.remainingFlags = remainingFlags;
    });
    this._gameStats.mineAmount$.subscribe((mineAmount: number) => {
      this.mineAmount = mineAmount;
    });
    this._gameStats.isFlagMode$.subscribe((isFlagMode: boolean) => {
      this.isFlagMode = isFlagMode;
    });
    this._gameStats.isFlagPermanently$.subscribe((isFlagPermanently: boolean) => {
      this.isFlagPermanently = isFlagPermanently;
    });
  }

  openHandbook() {
    this._action.toggleHandbook(true);
  }

  toggleFlagMode() {
    let state: boolean = this.isFlagMode? false : true;
    this._gameStats.setIsFlagMode(state);
    if(!state) {
      this._gameStats.setisFlagPermanently(false);
    }
  }

  toggleSetFlagPermanently(state: any) {
    this._gameStats.setisFlagPermanently(state.checked);
    this._gameStats.setIsFlagMode(state.checked);
  }

  setDifficulty(difficulty:string): void {
    this._storage.setSessionEntry('difficulty', difficulty);
    this._action.restartGame();
  }

  async restartGame() {
    this._action.restartGame();
    await this._api.addCaseCall(this._pattern.getCaseCollection);
    this._pattern.resetCaseCollection();
  }
}
