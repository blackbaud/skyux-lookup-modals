import { NgModule } from '@angular/core';
import { SKY_LIB_RESOURCES_PROVIDERS, SkyI18nModule } from '@skyux/i18n';

import { SkyLookupModalsResourcesProvider } from '../../plugin-resources/lookup-modals-resources-provider';

@NgModule({
  exports: [SkyI18nModule],
  providers: [
    {
      provide: SKY_LIB_RESOURCES_PROVIDERS,
      useClass: SkyLookupModalsResourcesProvider,
      multi: true
    }
  ]
})
export class SkyLookupModalsResourcesModule {}
