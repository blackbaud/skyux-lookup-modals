import { SkyLookupSelectMode } from '@skyux/lookup';

import { SkyLookupShowMoreModalConfig } from './show-more-modal-config';

/**
 * @internal
 * Context for the show more modal. These values are provided by the lookup component.
 */
export class SkyLookupShowMoreModalContext {
  public items: any[];
  public descriptorProperty: any;
  public initialSearch: string;
  public initialValue: any;
  public selectMode: SkyLookupSelectMode;
  public showAddButton: boolean;
  public userConfig: SkyLookupShowMoreModalConfig;
}
