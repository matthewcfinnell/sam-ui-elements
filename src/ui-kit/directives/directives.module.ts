import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamClickOutsideModule } from './click-outside/click-outside.directive.module';
import { SamStickyModule } from './sticky/sticky.module';
import { SamTabOutsideModule } from './tab-outside/taboutside.directive.module';
import { SamFocusModule } from './focus/focus.module';
import { SamDragDropModule } from './drag-drop/drag-drop.directive.module';
import { SamExternalLinkModule } from './external-link/external-link.directive.module';

@NgModule({
  imports: [ 
    CommonModule,
    SamClickOutsideModule,
    SamDragDropModule,
    SamExternalLinkModule,
    SamFocusModule,
    SamStickyModule,
    SamTabOutsideModule,
  ],
  declarations: [

  ],
  exports: [
    SamClickOutsideModule,
    SamTabOutsideModule,
    SamFocusModule,
    SamDragDropModule,
    SamExternalLinkModule,
    SamStickyModule,
  ]

})
export class SamDirectivesModule {}
