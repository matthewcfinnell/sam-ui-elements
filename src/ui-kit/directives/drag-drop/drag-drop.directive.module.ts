import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamDragDropDirective,DragState } from './drag-drop.directive';


@NgModule({
    imports: [CommonModule],
    declarations: [ SamDragDropDirective ],
    exports: [ SamDragDropDirective ],
})
export class SamDragDropModule { }

export {SamDragDropDirective}from './drag-drop.directive';
export {DragState}from './drag-drop.directive';