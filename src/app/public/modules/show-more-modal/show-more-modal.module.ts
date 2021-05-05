import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SKY_CORE_MODAL_PROVIDER,
  SkyViewkeeperModule
} from '@skyux/core';

import {
  SkyDataManagerModule
} from '@skyux/data-manager';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyInfiniteScrollModule,
  SkyRepeaterModule
} from '@skyux/lists';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkyThemeModule
} from '@skyux/theme';

import {
  SkyLookupModalsResourcesModule
 } from '../shared/lookup-modals-resources.module';

import {
  SkyLookupShowMoreModalComponent
} from './show-more-modal.component';

import {
  SkyLookupShowMoreModalProvider
} from './show-more-modal-provider';

@NgModule({
  declarations: [
    SkyLookupShowMoreModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyDataManagerModule,
    SkyIconModule,
    SkyInfiniteScrollModule,
    SkyLookupModalsResourcesModule,
    SkyModalModule,
    SkyRepeaterModule,
    SkyThemeModule,
    SkyViewkeeperModule
  ],
  entryComponents: [
    SkyLookupShowMoreModalComponent
  ],
  providers: [
    {
      provide: SKY_CORE_MODAL_PROVIDER,
      useClass: SkyLookupShowMoreModalProvider,
      multi: true
    }
  ]
})
export class SkyLookupShowMoreModalModule {}
