import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Case } from '../interfaces/case';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = this.urlService.getUrl('minesweeper-CBR-backend');

  asdf: any = [[0, 0],[0, 1],[0, 2],[0, 8],[0, 9], [1, 0]];

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
  ) { }

  private async post(
    path: string,
    obj: any,
    params: {} = {},
    options: any = {}
  ): Promise<any> {
    try {
      options.params = params;
      const call = (await this.http
        .post(this.api + path, obj, options)
        .toPromise()) as any;
      if (call.code == 400) {
        console.error('Bad request!');
      } else {
        return call;
      }
    } catch (err: any) {
    }
  }

  async getSolutionCall(pattern: string): Promise<any> {
    return this.post('getSolution?pattern=' + pattern, null);
  }

  async addCaseCall(caseCollection: Case[]) {
    for(let i = 0; i < caseCollection.length; i++) {
      console.dir(caseCollection[i]);
      await this.post('addCase?pattern=' + caseCollection[i].pattern + '&solvability=' + caseCollection[i].solvability + '&solutionCells=' + caseCollection[i].solutionCells + '&solutionTypes=' + caseCollection[i].solutionTypes, null);
    }
  }
}
