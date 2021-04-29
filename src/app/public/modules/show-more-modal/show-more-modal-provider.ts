import {
  Injectable
} from '@angular/core';

import {
  SkyModalProvider,
  SkyModalProviderCloseArgs
} from '@skyux/core';

import {
  SkyLookupShowMoreContext
} from '@skyux/lookup';

import {
  SkyModalService
} from '@skyux/modals';

import {
  Observable,
  Subject
} from 'rxjs';

import {
  SkyLookupShowMoreModalComponent
} from './show-more-modal.component';

@Injectable()
export class SkyLookupShowMoreModalProvider implements SkyModalProvider {

  public closed: Subject<SkyModalProviderCloseArgs> = new Subject();
  public type: string = 'lookup-show-more';
  public events: { [key: string]: Observable<any> } = {};

  constructor(private modalService: SkyModalService) {}

  public open(context: SkyLookupShowMoreContext) {
    const instance = this.modalService.open(SkyLookupShowMoreModalComponent, { providers: [{
      provide: SkyLookupShowMoreContext, useValue: context
    }]});

    this.events['addClick'] = (<SkyLookupShowMoreModalComponent> instance.componentInstance).addClick;
    instance.closed.subscribe((closeArgs: SkyModalProviderCloseArgs) => {
      this.closed.next(closeArgs);
    });
  }
}
