import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamAlertFooterComponent } from './alert-footer.component';
import { SamAlertModule } from '../alert/alert.module';
import {SamAlertFooterService} from'./alert-footer.service';

@NgModule({
    imports: [ CommonModule, SamAlertModule ],
    declarations: [ SamAlertFooterComponent ],
    exports: [ SamAlertFooterComponent ],
})
export class SamAlertFooterModule { }
export{SamAlertFooterComponent} from './alert-footer.component';
export {SamAlertFooterService}from'./alert-footer.service';
