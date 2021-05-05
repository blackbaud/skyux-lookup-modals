import {
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  SkyCoreModalCloseArgs,
  SkyCoreModalProviderService
} from '@skyux/core';

import {
  SkyLookupSelectMode
} from '@skyux/lookup';

import {
  Observable
} from 'rxjs';

@Component({
  selector: 'show-more-modal-test',
  templateUrl: './show-more-modal.component.fixture.html'
})
export class SkyShowMoreModalTestComponent {
  public addEvent: Observable<void>;
  public customTitle: string;
  public descriptorProperty: string = 'name';
  public enabledSearchResultTemplate: TemplateRef<any>;
  public initialSearch: string;
  public initialValue: any[];
  public returnedValue: SkyCoreModalCloseArgs;
  public showAddButton: boolean = false;

  public people: any[] = [
    { id: 1, name: 'Andy', birthDate: '1/1/1996', formal: 'Mr. Andy' },
    { id: 2, name: 'Beth' },
    { id: 3, name: 'David' },
    { id: 4, name: 'Frank' },
    { id: 5, name: 'Grace' },
    { id: 6, name: 'Isaac' },
    { id: 7, name: 'John' },
    { id: 8, name: 'Jupiter' },
    { id: 9, name: 'Joyce' },
    { id: 10, name: 'Lindsey' },
    { id: 11, name: 'Mitch' },
    { id: 12, name: 'Patty' },
    { id: 13, name: 'Paul' },
    { id: 14, name: 'Quincy' },
    { id: 15, name: 'Sally' },
    { id: 16, name: 'Susan' },
    { id: 17, name: 'Vanessa' },
    { id: 18, name: 'Winston' },
    { id: 19, name: 'Xavier' },
    { id: 20, name: 'Yolanda' },
    { id: 21, name: 'Zack' }
  ];

  @ViewChild('customSearchResultTemplate')
  public searchResultTemplate: TemplateRef<any>;

  constructor(private modalProviderService: SkyCoreModalProviderService) {}

  public enableSearchResultTemplate(): void {
    this.enabledSearchResultTemplate = this.searchResultTemplate;
  }

  public openSingleSelectModal(): void {
    this.openModalInstance(SkyLookupSelectMode.single);
  }

  public openMultiSelectModal(): void {
    this.openModalInstance(SkyLookupSelectMode.multiple);
  }

  public openModalInstance(selectMode: SkyLookupSelectMode): void {
    const modalProvider = this.modalProviderService.getModalForType(
      'lookup-show-more'
    );
    const context: any = {
      descriptorProperty: this.descriptorProperty,
      items: this.people,
      selectMode: selectMode,
      showAddButton: this.showAddButton
    };

    if (this.initialSearch) {
      context.initialSearch = this.initialSearch;
    }

    if (this.initialValue) {
      context.initialValue = this.initialValue;
    }

    if (this.customTitle || this.enabledSearchResultTemplate) {
      context.userConfig = {};

      if (this.customTitle) {
        context.userConfig.title = this.customTitle;
      }

      if (this.enabledSearchResultTemplate) {
        context.userConfig.itemTemplate = this.enabledSearchResultTemplate;
      }
    }

    const modalInstance = modalProvider.open({ context: context });

    this.addEvent = modalInstance.componentInstance.addClick;

    modalInstance.closed.subscribe((args: SkyCoreModalCloseArgs) => {
      this.returnedValue = args;
    });
  }
}
