import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SamFormControlsModule } from '../form-controls';
import { SamDirectivesModule } from '../directives';
import { SamElementsModule } from '../elements/elements.module';
import {SamActionModule}from './actions/Action.module';
import { AccordionsModule } from './accordion/accordion.module';
import { SamAlertModule } from './alert/alert.module';
import { SamAlertFooterModule } from './alert-footer/alert-footer.module';
import { SamBadgeModule } from './badge/badge.module';
import { SamBannerModule } from './banner/banner.module';
import { SamBreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { SamDownloadModule } from './download/download.module';
import { SamHeaderModule } from './header/header.module';
import { SamHistoryModule } from './history/history.module';
import { SamModalModule } from './modal/modal.module';
import { SamMultiSelectDropdownModule } from './multiselect-dropdown/multiselect-dropdown.module';
import { SamPaginationModule } from './pagination/pagination.module';
import { SamPipesModule } from '../pipes/pipes.module';
import { SamPointOfContactModule } from './point-of-contact/point-of-contact.module';
import { SamProgressModule } from './progress-bar/progress.module';
import { SamSidenavModule } from './sidenav/sidenav.module';
import { SamSpinnerModule } from './spinner/spinner.module';
import { SamTabsModule } from './tabs/tabs.module';
import { SamWrapperModule } from '../wrappers';
import { SamCommentsModule } from './comments/comments.module';
import { SamImageModule } from './image/image.module';
import { SamDataTableModule } from './data-table/data-table.module';
import { SamPageTitleModule } from './page-title/page-title.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SamFormControlsModule,
    SamDirectivesModule,
    SamElementsModule,
    AccordionsModule,
    SamPipesModule,
    SamSidenavModule,
    SamWrapperModule,
    SamCommentsModule,
    SamImageModule,
    SamDataTableModule,
    SamBannerModule,
    SamHeaderModule,
    SamModalModule,
    SamBreadcrumbsModule,
    SamProgressModule,
    SamActionModule,
    SamAlertModule,
    SamAlertFooterModule,
    SamBadgeModule,
    SamDownloadModule,
    SamHistoryModule,
    SamMultiSelectDropdownModule,
    SamPaginationModule,
    SamPointOfContactModule,
    SamSpinnerModule,
    SamTabsModule,
    SamPageTitleModule,
  ],
  declarations: [
    
  ],
  exports: [
    SamActionModule,
    SamAlertModule,
    SamAlertFooterModule,
    SamBadgeModule,
    SamBannerModule,
    SamBreadcrumbsModule,
    SamDownloadModule,
    SamHeaderModule,
    SamHistoryModule,
    SamModalModule,
    SamMultiSelectDropdownModule,
    SamPaginationModule,
    SamPointOfContactModule,
    SamProgressModule,
    SamSidenavModule,
    SamSpinnerModule,
    SamTabsModule,
    AccordionsModule,
    SamCommentsModule,
    SamImageModule,
    SamDataTableModule,
    SamPageTitleModule,
  ]
})
export class SamComponentsModule {}


export { SamFormControlsModule } from '../form-controls';
export { SamDirectivesModule } from '../directives';
export { SamElementsModule } from '../elements/elements.module';
export {SamActionModule}from './actions/Action.module';
export { AccordionsModule } from './accordion/accordion.module';
export { SamAlertModule } from './alert/alert.module';
export { SamAlertFooterModule } from './alert-footer/alert-footer.module';
export { SamBadgeModule } from './badge/badge.module';
export { SamBannerModule } from './banner/banner.module';
export { SamBreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
export { SamDownloadModule } from './download/download.module';
export { SamHeaderModule } from './header/header.module';
export { SamHistoryModule } from './history/history.module';
export { SamModalModule } from './modal/modal.module';
export { SamMultiSelectDropdownModule } from './multiselect-dropdown/multiselect-dropdown.module';
export { SamPaginationModule } from './pagination/pagination.module';
export { SamPipesModule } from '../pipes/pipes.module';
export { SamPointOfContactModule } from './point-of-contact/point-of-contact.module';
export { SamProgressModule } from './progress-bar/progress.module';
export { SamSidenavModule } from './sidenav/sidenav.module';
export { SamSpinnerModule } from './spinner/spinner.module';
export { SamTabsModule } from './tabs/tabs.module';
export { SamWrapperModule } from '../wrappers';
export { SamCommentsModule } from './comments/comments.module';
export { SamImageModule } from './image/image.module';
export { SamDataTableModule } from './data-table/data-table.module';
export { SamPageTitleModule } from './page-title/page-title.module';










//  export * from './accordion';
//  export * from './actions';
// export * from './alert';
//  export * from './alert-footer';
//  export * from './badge';
//  export * from './banner/banner.module';
//  export * from './breadcrumbs/breadcrumbs.module';
//  export * from './comments';
//  export * from './data-table';
//  export * from './download';
//  export * from './header';
//  export * from './history';
//  export * from './image';
//  export * from './modal';
//  export * from './multiselect-dropdown';
//  export * from './pagination';
//  export * from './point-of-contact';
//  export * from './sidenav';
//  export * from './spinner';
//  export * from './tabs';
//  export * from './page-title';
//  export * from './components.module';
//  export * from './progress-bar';

