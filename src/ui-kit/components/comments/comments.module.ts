import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SamCommentsComponent } from './comments.component';
import { SamCommentComponent } from './comment/comment.component';

import { SamPipesModule } from '../../pipes/pipes.module';
import { SamTextAreaModule } from '../../form-controls';
import { AccordionsModule } from '../accordion/accordion.module';

import {Comment} from './interfaces';
//TODO:THOMAS:Comment

@NgModule({
  declarations: [
    SamCommentsComponent,
    SamCommentComponent,
  ],
  exports: [
    SamCommentsComponent,
    SamCommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SamTextAreaModule,
    AccordionsModule,
    SamPipesModule
  ],
})
export class SamCommentsModule {}

export { SamCommentsComponent } from './comments.component';
export { SamCommentComponent } from './comment/comment.component';
export {Comment} from './interfaces';
