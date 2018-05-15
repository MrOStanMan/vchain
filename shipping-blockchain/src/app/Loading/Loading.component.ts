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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingService } from './Loading.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Loading',
	templateUrl: './Loading.component.html',
	styleUrls: ['./Loading.component.css'],
  providers: [LoadingService]
})
export class LoadingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          loadingId = new FormControl("", Validators.required);
        
  
      
          nomination = new FormControl("", Validators.required);
        
  
      
          NORTendered = new FormControl("", Validators.required);
        
  
      
          documentsOnBoard = new FormControl("", Validators.required);
        
  
      
          BLQuantity = new FormControl("", Validators.required);
        
  


  constructor(private serviceLoading:LoadingService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          loadingId:this.loadingId,
        
    
        
          nomination:this.nomination,
        
    
        
          NORTendered:this.NORTendered,
        
    
        
          documentsOnBoard:this.documentsOnBoard,
        
    
        
          BLQuantity:this.BLQuantity
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLoading.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "firstcoin.shipping.Loading",
      
        
          "loadingId":this.loadingId.value,
        
      
        
          "nomination":this.nomination.value,
        
      
        
          "NORTendered":this.NORTendered.value,
        
      
        
          "documentsOnBoard":this.documentsOnBoard.value,
        
      
        
          "BLQuantity":this.BLQuantity.value
        
      
    };

    this.myForm.setValue({
      
        
          "loadingId":null,
        
      
        
          "nomination":null,
        
      
        
          "NORTendered":null,
        
      
        
          "documentsOnBoard":null,
        
      
        
          "BLQuantity":null
        
      
    });

    return this.serviceLoading.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "loadingId":null,
        
      
        
          "nomination":null,
        
      
        
          "NORTendered":null,
        
      
        
          "documentsOnBoard":null,
        
      
        
          "BLQuantity":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "firstcoin.shipping.Loading",
      
        
          
        
    
        
          
            "nomination":this.nomination.value,
          
        
    
        
          
            "NORTendered":this.NORTendered.value,
          
        
    
        
          
            "documentsOnBoard":this.documentsOnBoard.value,
          
        
    
        
          
            "BLQuantity":this.BLQuantity.value
          
        
    
    };

    return this.serviceLoading.updateAsset(form.get("loadingId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceLoading.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLoading.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "loadingId":null,
          
        
          
            "nomination":null,
          
        
          
            "NORTendered":null,
          
        
          
            "documentsOnBoard":null,
          
        
          
            "BLQuantity":null 
          
        
      };



      
        if(result.loadingId){
          
            formObject.loadingId = result.loadingId;
          
        }else{
          formObject.loadingId = null;
        }
      
        if(result.nomination){
          
            formObject.nomination = result.nomination;
          
        }else{
          formObject.nomination = null;
        }
      
        if(result.NORTendered){
          
            formObject.NORTendered = result.NORTendered;
          
        }else{
          formObject.NORTendered = null;
        }
      
        if(result.documentsOnBoard){
          
            formObject.documentsOnBoard = result.documentsOnBoard;
          
        }else{
          formObject.documentsOnBoard = null;
        }
      
        if(result.BLQuantity){
          
            formObject.BLQuantity = result.BLQuantity;
          
        }else{
          formObject.BLQuantity = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "loadingId":null,
        
      
        
          "nomination":null,
        
      
        
          "NORTendered":null,
        
      
        
          "documentsOnBoard":null,
        
      
        
          "BLQuantity":null 
        
      
      });
  }

}