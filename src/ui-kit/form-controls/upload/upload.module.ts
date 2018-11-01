import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamUploadComponent } from './upload.component';
import { SamProgressModule } from '../../components/components.module';
import { SamDragDropModule } from '../../directives';
import { SamFilesizeModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [ SamUploadComponent ],
    exports: [ SamUploadComponent ],
    imports: [CommonModule, SamDragDropModule, SamProgressModule, SamFilesizeModule]
})
export class SamUploadModule { }