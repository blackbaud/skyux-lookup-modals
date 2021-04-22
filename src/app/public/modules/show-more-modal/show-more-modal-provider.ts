import {
  EventEmitter,
  Injectable
} from '@angular/core';

import {
  SkyModalProvider,
  SkyModalProviderCloseArgs
} from '@skyux/core';

import {
  SkyModalService
} from '@skyux/modals';

import {
  Subject
} from 'rxjs';

import {
  SkyLookupShowMoreModalComponent
} from './show-more-modal.component';

import {
  SkyLookupShowMoreModalContext
} from './types/show-more-modal-context';

@Injectable()
export class SkyLookupShowMoreModalProvider implements SkyModalProvider {

  public closeCallback: Subject<SkyModalProviderCloseArgs> = new Subject();
  public type: string = 'lookup-show-more';
  public events: { [key: string]: EventEmitter<any> } = {};

  constructor(private modalService: SkyModalService) {}

  public open(context: SkyLookupShowMoreModalContext) {
    const instance = this.modalService.open(SkyLookupShowMoreModalComponent, { providers: [{
      provide: SkyLookupShowMoreModalContext, useValue: context
    }]});

    this.events['addClick'] = (<SkyLookupShowMoreModalComponent> instance.componentInstance).addClick;
    instance.closed.subscribe((closeArgs) => {
      this.closeCallback.next(closeArgs);
    });
  }
}
