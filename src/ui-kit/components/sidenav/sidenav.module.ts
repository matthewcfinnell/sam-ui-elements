


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamSidenavComponent } from './sidenav/sidenav.component';
import { SamMenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
    declarations: [SamSidenavComponent, SamMenuItemComponent],
    exports: [SamSidenavComponent, SamMenuItemComponent],
    imports: [CommonModule]
})
export class SamSidenavModule { }



export { SamSidenavComponent } from './sidenav/sidenav.component';
export { MenuItem } from './interfaces';
export { SidenavService } from './services';
export { SamMenuItemComponent }from './menu-item/menu-item.component'

