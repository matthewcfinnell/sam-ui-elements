import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateTimeDisplayModule } from './date-time-display/date-time-display.pipe.module';
import { TimeAgoModule } from './time-ago/time-ago.pipe.module';
import { ShortDateModule } from './short-date/short-date.pipe.module';
import { SamFilesizeModule } from './filesize/filesize.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    DateTimeDisplayModule,
    SamFilesizeModule,
    ShortDateModule,
    TimeAgoModule,
  ],
  declarations: [

  ],
  exports: [
    SamFilesizeModule,
    TimeAgoModule,
    DateTimeDisplayModule,
    ShortDateModule,
  ],
  providers: []
})
export class SamPipesModule { }

export { DateTimeDisplayModule } from './date-time-display/date-time-display.pipe.module';
export { TimeAgoModule } from './time-ago/time-ago.pipe.module';
export { ShortDateModule } from './short-date/short-date.pipe.module';
export { SamFilesizeModule } from './filesize/filesize.pipe.module';
