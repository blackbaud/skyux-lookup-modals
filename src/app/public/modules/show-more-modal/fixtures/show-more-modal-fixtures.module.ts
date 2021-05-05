import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SkyLookupModule } from '@skyux/lookup';

import { SkyLookupShowMoreModalModule } from '../show-more-modal.module';

import { SkyShowMoreModalTestComponent } from './show-more-modal.component.fixture';

@NgModule({
  declarations: [SkyShowMoreModalTestComponent],
  imports: [RouterTestingModule, SkyLookupModule, SkyLookupShowMoreModalModule],
  exports: [SkyShowMoreModalTestComponent]
})
export class SkyLookupShowMoreModalFixturesModule {}
