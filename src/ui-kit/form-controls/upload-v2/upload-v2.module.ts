import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SamUploadComponentV2 } from './upload-v2.component';
import { SamProgressModule } from '../../components/components.module';
import { SamDragDropModule } from '../../directives';
import { SamFilesizeModule } from '../../pipes/pipes.module';
import {SamModalModule} from '../../components/components.module';

@NgModule({
    declarations: [ SamUploadComponentV2 ],
    exports: [ SamUploadComponentV2 ],
    imports: [
        CommonModule,
        FormsModule,
        SamDragDropModule,
        SamProgressModule,
        SamFilesizeModule,
        SamModalModule
    ]
})
export class SamUploadV2Module { }