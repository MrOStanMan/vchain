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
import { Discharge, SetDischargeConnectTimestamp, Nomination } from '../firstcoin.shipping';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class DischargeService {

	
    private NAMESPACE: string = 'firstcoin.shipping.Discharge';
    private QUERYNAMESPACE: string = 'queries/SelectDischargeByNomination?id=';
	



    constructor(private dataService: DataService<Discharge>,
      private dataService2: DataService<Nomination>) {
    };

    public getAll(): Observable<Discharge[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Discharge> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Discharge> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Discharge> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Discharge> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public queryNominations(id: any): Observable<Nomination[]> {
      let nomIdString = "resource:firstcoin.shipping.Nomination%23" + id;
      return this.dataService2.queryNomination(this.QUERYNAMESPACE, nomIdString);
    }

}
