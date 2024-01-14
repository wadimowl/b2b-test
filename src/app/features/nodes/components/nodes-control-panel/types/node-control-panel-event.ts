import { NodesControlPanelParams } from '../../../types/nodes-control-panel-params.interace';

type ValueOf<T> = T[keyof T];
export interface NodeControlPanelEvent<T = NodesControlPanelParams> {
  id: keyof T;
  value: ValueOf<T>;
}
