import { Component, Input } from '@angular/core';
import { LabelWrapper } from '../wrapper/label-wrapper.component';

/**
 * The <samNameInput> component is a Name entry portion of a form
 *
 * @Input/@Output model - the bound value of the component
 * @Input prefix - Prefix name/id attribute values
 *
 */
@Component({
  selector: 'sam-name-entry',
  templateUrl: 'name-entry.template.html',
})
export class SamNameEntryComponent {
  @Input() model: any = {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: ""
  };
  @Input() prefix: string = "";
  titleErrorMsg: string = "";
  fNameErrorMsg: string = "";
  mNameErrorMsg: string = "";
  lNameErrorMsg: string = "";
  suffixErrorMsg: string = "";

  constructor() { }

  ngOnInit() {
  }

  getIdentifer(str){
    if(this.prefix.length>0){
      str = this.prefix + "-" + str;
    }
    return str;
  }
  validateFirstName(){
    var error = false;
    if(/^[0-9]+$/.test(this.model.firstName)){
      error = true;
      this.fNameErrorMsg = "Please enter a valid name";
    }
    if(this.model.firstName.length==0){
      error = true;
      this.fNameErrorMsg = "This field is required";
    }
    if(!error){
      this.fNameErrorMsg = "";
    }
  }
  validateMiddleName(){
    var error = false;
    if(/^[0-9]+$/.test(this.model.middleName)){
      error = true;
      this.mNameErrorMsg = "Please enter a valid name";
    }
    if(!error){
      this.mNameErrorMsg = "";
    }
  }
  validateLastName(){
    var error = false;
    if(/^[0-9]+$/.test(this.model.lastName)){
      error = true;
      this.lNameErrorMsg = "Please enter a valid name";
    }
    if(this.model.lastName.length==0){
      error = true;
      this.lNameErrorMsg = "This field is required";
    }
    if(!error){
      this.lNameErrorMsg = "";
    }
  }

}