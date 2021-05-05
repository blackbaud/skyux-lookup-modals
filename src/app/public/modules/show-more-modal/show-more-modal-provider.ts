import {
  Injectable
} from '@angular/core';

import {
  SkyCoreModalProvider,
  SkyCoreModalProviderOpenArgs,
  SkyCoreModalInstance
} from '@skyux/core';

import {
  SkyLookupShowMoreContext
} from '@skyux/lookup';

import {
  SkyModalService
} from '@skyux/modals';

import {
  SkyLookupShowMoreModalComponent
} from './show-more-modal.component';

@Injectable()
export class SkyLookupShowMoreModalProvider implements SkyCoreModalProvider {

  public type: string = 'lookup-show-more';

  constructor(private modalService: SkyModalService) {}

  public open(openArgs: SkyCoreModalProviderOpenArgs): SkyCoreModalInstance {
    return this.modalService.open(SkyLookupShowMoreModalComponent, { providers: [{
      provide: SkyLookupShowMoreContext, useValue: openArgs.context
    }]});
  }
}
