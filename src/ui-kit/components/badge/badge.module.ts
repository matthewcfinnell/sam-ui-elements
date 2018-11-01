import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamBadgeComponent } from './badge.component';

import { BadgeConfig } from './types';

//TODO:THOMAS:BadgeConfig
@NgModule({
    imports: [CommonModule],
    declarations: [SamBadgeComponent],
    exports: [SamBadgeComponent],
})
export class SamBadgeModule { }

export { SamBadgeComponent }from './badge.component';
export { BadgeConfig }from './types';


