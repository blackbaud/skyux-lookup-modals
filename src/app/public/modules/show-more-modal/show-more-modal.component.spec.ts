import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  SkyCoreModalCloseArgs
} from '@skyux/core';

import {
  SkyLookupSelectMode,
  SkyLookupShowMoreContext
} from '@skyux/lookup';

import {
  SkyModalService
} from '@skyux/modals';

import {
  Subject
} from 'rxjs';

import {
  SkyLookupShowMoreModalFixturesModule
} from './fixtures/show-more-modal-fixtures.module';

import {
  SkyShowMoreModalTestComponent
} from './fixtures/show-more-modal.component.fixture';

import {
  SkyLookupShowMoreModalComponent
} from './show-more-modal.component';

describe('show more modal', () => {

  function clickShowMoreAddButton(): void {
    getShowMoreAddButton().click();
    fixture.detectChanges();
  }

  function clickShowMoreClearAll(): void {
    (<HTMLElement>document.querySelector('.sky-data-manager-clear-all-btn')).click();
    fixture.detectChanges();
  }

  function clickShowMoreMultiple(): void {
    getShowMoreButtonMultiple().click();
    fixture.detectChanges();
    tick();
  }

  function clearShowMoreSearch(): void {
    (<HTMLElement>document.querySelector('.sky-lookup-show-more-data-manager .sky-search-btn-clear')).click();

    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();
  }

  function clickShowMoreSelectAll(): void {
    (<HTMLElement>document.querySelector('.sky-data-manager-select-all-btn')).click();
    fixture.detectChanges();
  }

  function clickShowMoreSingle(): void {
    getShowMoreButtonSingle().click();
    fixture.detectChanges();
    tick();
  }

  function closeShowMoreModal(): void {
    (<HTMLElement>document.querySelector('.sky-lookup-show-more-modal-close'))?.click();
    fixture.detectChanges();
    tick();
  }

  function getShowMoreRepeaterItemCount(): number {
    return document.querySelectorAll('sky-modal sky-repeater-item').length;
  }

  function getShowMoreAddButton(): HTMLElement {
    return document.querySelector('.sky-lookup-show-more-modal-add') as HTMLElement;
  }

  function getShowMoreButtonMultiple(): HTMLElement {
    return document.querySelector(
      '#show-more-modal-launcher-multiple'
    ) as HTMLElement;
  }

  function getShowMoreRepeaterItemContent(index: number): string {
    return (<HTMLElement>document
      .querySelectorAll('sky-modal sky-repeater-item-content')[index]).textContent.trim();
  }

  function getShowMoreButtonSingle(): HTMLElement {
    return document.querySelector(
      '#show-more-modal-launcher-single'
    ) as HTMLElement;
  }

  function getShowMoreModalTitle(): string {
    return document.querySelector('sky-modal-header').textContent.trim();
  }

  function saveShowMoreModal(): void {
    (<HTMLElement>document.querySelector('.sky-lookup-show-more-modal-save')).click();
    fixture.detectChanges();
  }

  function selectShowOnlySelected(): void {
    (<HTMLElement>document.querySelector('.sky-lookup-show-more-data-manager .sky-toolbar-view-actions input')).click();
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();
  }

  function selectShowMoreItemMultiple(index: number): void {
    (<HTMLElement>document.querySelectorAll('.sky-lookup-show-more-repeater sky-repeater-item input')[index]).click();
    fixture.detectChanges();
  }

  function selectShowMoreItemSingle(index: number): void {
    (<HTMLElement>document.querySelectorAll('.sky-lookup-show-more-repeater sky-repeater-item')[index]).click();
    fixture.detectChanges();
  }

  let modalService: SkyModalService;

  let fixture: ComponentFixture<SkyShowMoreModalTestComponent>;
  let component: SkyShowMoreModalTestComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [SkyLookupShowMoreModalFixturesModule]
    });

    fixture = TestBed.createComponent(SkyShowMoreModalTestComponent);
    component = fixture.componentInstance;

    modalService = TestBed.inject(SkyModalService);

    fixture.detectChanges();
    tick();
  }));

  // This is necessary as due to modals being launched outside of the test bed they will not
  // automatically be disposed between tests.
  afterEach(fakeAsync(() => {
    // NOTE: This is important as it ensures that the modal host component is fully disposed of
    // between tests. This is important as the modal host might need a different set of component
    // injectors than the previous test.
    modalService.dispose();
    fixture.detectChanges();
  }));

  describe('multi-select', () => {

    it('should open the modal when the show more modal provider is invoked as a multi-select', fakeAsync(() => {
      spyOn(modalService, 'open').and.callThrough();

      clickShowMoreMultiple();
      expect(modalService.open).toHaveBeenCalledWith(
        SkyLookupShowMoreModalComponent,
        {
          providers: <any> jasmine.arrayContaining([
            {
              provide: SkyLookupShowMoreContext,
              useValue: {
                descriptorProperty: 'name',
                items: component.people,
                selectMode: SkyLookupSelectMode.multiple,
                showAddButton: false
              }
            }
          ])
        }
      );
    }));

    it('should populate the correct selected item and save that when no changes are made',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }, { value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreMultiple();

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [5, 9] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct items when multiple are selected from the show all modal',
      fakeAsync(() => {
        component.initialValue = [{ value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreMultiple();

        selectShowMoreItemMultiple(5);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [9, 5] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should not make any changes when the show all modal is cancelled',
      fakeAsync(() => {
        component.initialValue = [{ value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreMultiple();

        selectShowMoreItemMultiple(0);

        closeShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'close', data: undefined };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct items when items are deselected from the show all modal',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }, { value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreMultiple();

        selectShowMoreItemMultiple(5);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [9] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct items with initial search text',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }];
        component.initialSearch = 'e';

        clickShowMoreMultiple();

        selectShowMoreItemMultiple(0);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [5, 1] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct items after existing search text is cleared',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }, { value:
        { id: 10, name: 'Lindsey' }}];
        component.initialSearch = 'r';

        clickShowMoreMultiple();

        clearShowMoreSearch();

        selectShowMoreItemMultiple(0);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [5, 9, 0] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should handle "Clear all" correct in the show more modal',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }, { value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreMultiple();

        clickShowMoreClearAll();

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should handle "Select all" correct in the show more modal',
      fakeAsync(() => {
        component.initialValue = [];
        component.initialSearch = 'Pa';

        clickShowMoreMultiple();

        clickShowMoreSelectAll();

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [11, 12] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should handle "Only show selected correctly in the show more modal',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }, { value:
        { id: 10, name: 'Lindsey' }}];
        component.initialSearch = 's';

        clickShowMoreMultiple();

        selectShowOnlySelected();

        selectShowMoreItemMultiple(0);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [9] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('the default modal title should be correct',
      fakeAsync(() => {
        clickShowMoreMultiple();

        expect(getShowMoreModalTitle()).toBe('Select options');
      })
    );

    it('should respect a custom modal title',
      fakeAsync(() => {
        component.customTitle = 'Custom title';

        clickShowMoreMultiple();

        expect(getShowMoreModalTitle()).toBe('Custom title');
      })
    );
  });

  describe('single-select', () => {
    it('should open the modal when the show more modal provider is invoked as a single-select', fakeAsync(() => {
      spyOn(modalService, 'open').and.callThrough();

      clickShowMoreSingle();
      expect(modalService.open).toHaveBeenCalledWith(
        SkyLookupShowMoreModalComponent,
        {
          providers: <any> jasmine.arrayContaining([
            {
              provide: SkyLookupShowMoreContext,
              useValue: {
                descriptorProperty: 'name',
                items: component.people,
                selectMode: SkyLookupSelectMode.single,
                showAddButton: false
              }
            }
          ])
        }
      );
    }));

    it('should populate the correct selected item and save that when no changes are made',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }];

        clickShowMoreSingle();

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [5] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct item when changed from the show all modal',
      fakeAsync(() => {
        component.initialValue = [{ value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreSingle();

        selectShowMoreItemSingle(5);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [5] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should not make any changes when the show all modal is cancelled',
      fakeAsync(() => {
        component.initialValue = [{ value:
        { id: 10, name: 'Lindsey' }}];

        clickShowMoreSingle();

        selectShowMoreItemSingle(0);

        closeShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'close', data: undefined };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct items with initial search text',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }];
        component.initialSearch = 'e';

        clickShowMoreSingle();

        selectShowMoreItemSingle(0);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [1] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('should select the correct items after existing search text is cleared',
      fakeAsync(() => {
        component.initialValue = [{ value: { id: 6, name: 'Isaac' } }, { value:
        { id: 10, name: 'Lindsey' }}];
        component.initialSearch = 'r';

        clickShowMoreSingle();

        clearShowMoreSearch();

        selectShowMoreItemSingle(0);

        saveShowMoreModal();

        const expectedValue: SkyCoreModalCloseArgs = { reason: 'save', data: [0] };
        expect(component.returnedValue.reason).toEqual(expectedValue.reason);
        expect(component.returnedValue.data).toEqual(expectedValue.data);
      })
    );

    it('the default modal title should be correct',
      fakeAsync(() => {
        clickShowMoreSingle();

        expect(getShowMoreModalTitle()).toBe('Select an option');
      })
    );

    it('should respect a custom modal title',
      fakeAsync(() => {
        component.customTitle = 'Custom title';

        clickShowMoreSingle();

        expect(getShowMoreModalTitle()).toBe('Custom title');
      })
    );
  });

  it('should show only searched items when search is enabled',
    fakeAsync(() => {
      component.initialSearch = 'Pa';

      clickShowMoreMultiple();

      expect(getShowMoreRepeaterItemCount()).toBe(2);
    })
  );

  it('should 10 items by default',
    fakeAsync(() => {
      clickShowMoreMultiple();

      expect(getShowMoreRepeaterItemCount()).toBe(10);
    })
  );

  it('should trickle down the add button click event when triggered from the show all modal',
    fakeAsync(() => {
      component.showAddButton = true;

      clickShowMoreMultiple();

      const addEvent: Subject<void> = component.addEvent as Subject<void>;

      const addButtonSpy = spyOn(addEvent, 'next').and.callThrough();

      clickShowMoreAddButton();

      expect(addButtonSpy).toHaveBeenCalled();
    })
  );

  it('should respect a descriptor property being sent into the show more modal',
    fakeAsync(() => {
      component.descriptorProperty = 'birthDate';

      clickShowMoreMultiple();

      expect(getShowMoreRepeaterItemContent(0)).toBe('1/1/1996');
    })
  );

  it('should respect a custom modal template',
    fakeAsync(() => {
      component.descriptorProperty = 'birthDate';
      component.enableSearchResultTemplate();

      clickShowMoreMultiple();

      expect(getShowMoreRepeaterItemContent(0)).toBe('Mr. Andy');
    })
  );
});
