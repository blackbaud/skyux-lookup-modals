import {
  Component
} from '@angular/core';

import {
  SkyCoreModalProviderService
} from '@skyux/core';

import {
  SkyLookupSelectMode
} from '@skyux/lookup';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'show-more-modal-visual',
  templateUrl: './show-more-modal-visual.component.html',
  styleUrls: ['./show-more-modal-visual.component.scss']
})
export class SkyShowMoreModalVisualComponent {
  public buttonsHidden: boolean;

  public people: any[] = [
    { id: 1, name: 'Andy' },
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

  constructor(
    private modalProviderService: SkyCoreModalProviderService,
    private themeSvc: SkyThemeService
  ) { }

  public openSingleSelectModal(): void {
    this.openModalInstance(SkyLookupSelectMode.single);
  }

  public openMultiSelectModal(): void {
    this.openModalInstance(SkyLookupSelectMode.multiple);
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }

  public hideButtons(): void {
    this.buttonsHidden = true;
  }

  public showButtons(): void {
    this.buttonsHidden = false;
  }

  public openModalInstance(selectMode: SkyLookupSelectMode): void {
    const modalProvider = this.modalProviderService.getModalForType(
      'lookup-show-more'
    );

    const modalInstance = modalProvider.open({
      context: {
        items: this.people,
        descriptorProperty: 'name',
        selectMode: selectMode,
        showAddButton: true
      }
    });

    modalInstance.componentInstance.addClick.subscribe(() => {
      console.log('Add Button Clicked!');
    });

    modalInstance.closed.subscribe((closeArgs) => {
      if (closeArgs.reason === 'save') {
        console.log('Modal saved with data: ' + closeArgs.data);
      } else {
        console.log('Modal cancelled');
      }
      this.showButtons();
    });
    this.hideButtons();
  }
}
