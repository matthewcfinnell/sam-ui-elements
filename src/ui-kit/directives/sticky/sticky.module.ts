import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamStickyComponent } from './sticky.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SamStickyComponent],
    exports: [SamStickyComponent],
})
export class SamStickyModule { }

export { SamStickyComponent } from './sticky.component';
