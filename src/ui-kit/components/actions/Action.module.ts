import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamActionButtonModule } from './action-button/action-Button.module';
import { SamActionInterface } from './action-interface';
import {SamActionDropDownModule} from'./actions-dropdown/actions-dropdown.module';
//TODO:THOMAS SamActionInterface  
@NgModule({
        imports: [CommonModule,SamActionButtonModule,SamActionDropDownModule ],
    declarations: [  ],
    exports: [SamActionButtonModule,SamActionDropDownModule ]
})
export class SamActionModule { }

export {SamActionDropDownModule} from'./actions-dropdown/actions-dropdown.module';
export  { SamActionButtonModule }from './action-button/action-Button.module';
export { SamActionInterface }from './action-interface';
