/**
 * Third party imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { SamUIKitModule } from '../../../ui-kit/sam-ui-elements.module';

import { FilterWrapperComponent } from './filter.wrapper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SamUIKitModule,
    FormlyModule.forRoot({
      wrappers: [
        {
          name: 'filter',
          component: FilterWrapperComponent
        }
      ]
    })
  ],
  declarations: [
    FilterWrapperComponent
  ],
  exports: [
    FilterWrapperComponent
  ]
})
export class SamFilterWrapperModule {}
