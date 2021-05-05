import { NgModule } from '@angular/core';
import { SkyDocsToolsModule, SkyDocsToolsOptions } from '@skyux/docs-tools';
import { SkyPageModule } from '@skyux/layout';
import { SkyAppLinkModule } from '@skyux/router';

import { SkyLookupShowMoreModalModule } from './public/public_api';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyDocsToolsModule,
    SkyLookupShowMoreModalModule,
    SkyPageModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-lookup-modals',
        packageName: '@skyux/lookup-modals'
      }
    }
  ]
})
export class AppExtrasModule {}
