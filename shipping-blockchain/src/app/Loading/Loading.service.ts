/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Loading, SetLoadingNORTemperedTimestamp, SetLoadingDocumentsOnBoardTimestamp, Nomination } from '../firstcoin.shipping';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LoadingService {

	
		private NAMESPACE: string = 'firstcoin.shipping.Loading';
    private QUERYNAMESPACE: string = 'queries/SelectLoadingByNomination?id=';

    constructor(private dataService: DataService<Loading>, 
      private dataService2: DataService<SetLoadingNORTemperedTimestamp>, 
      private dataService3: DataService<SetLoadingDocumentsOnBoardTimestamp>,
      private dataService4: DataService<Nomination>) {
    };

    public getAll(): Observable<Loading[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Loading> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Loading> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public addAsset2(itemToAdd: any, id: any): Observable<Loading> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Loading> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Loading> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public queryNominations(id: any): Observable<Nomination[]> {
      let nomIdString = "resource:firstcoin.shipping.Nomination%23" + id;
      return this.dataService4.queryNomination(this.QUERYNAMESPACE, nomIdString);
    }

}
