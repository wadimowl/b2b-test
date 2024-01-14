import { NodesControlPanelParams } from '../../../types/nodes-control-panel-params.interace';
import { FormControl } from '@angular/forms';

export interface NodesControlPanelForm {
  amount: FormControl<NodesControlPanelParams['amount']>;
  frequency: FormControl<NodesControlPanelParams['frequency']>;
  ids: FormControl<string>;
}
