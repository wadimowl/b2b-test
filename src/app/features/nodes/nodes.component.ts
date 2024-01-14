import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FakeSocketListenerService
} from '../../services/fake-socket/services/fake-socket-listener/fake-socket-listener.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ColorNode } from '../../services/fake-socket/types/color-node';
import {
  FakeSocketRequesterFacade
} from '../../services/fake-socket/services/fake-socket-requester/fake-socket-requester-facade';
import { NodeControlPanelEvent } from './components/nodes-control-panel/types/node-control-panel-event';
import { ProtoColorNodeWithData } from '../../../protobuffs';

const ITEMS_TO_RENDER_FROM_BEGINNING_OR_END = -10; // + start from beginning, - start from end

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesComponent {
  private ids$ = new BehaviorSubject<ColorNode['id'][]>([]);
  readonly data$: Observable<ProtoColorNodeWithData[]>;

  constructor(socketListener: FakeSocketListenerService, private socketRequester: FakeSocketRequesterFacade) {
    const lastXNodes$ = socketListener.colorsNodesMessages().pipe(
      map(list => list.slice(ITEMS_TO_RENDER_FROM_BEGINNING_OR_END))
    );
    this.data$ = combineLatest([lastXNodes$, this.ids$]).pipe(map(([nodes, ids]) => {
      ids.slice(0, nodes.length).forEach((id, index) => {
        nodes[index].id = id;
      });

      return [...nodes];
    }));
  }

  controlParamsChanged(event: NodeControlPanelEvent) {
    switch (event.id) {
      case 'ids':
        this.ids$.next(event.value as string[]);
        break;
      case 'amount':
        this.socketRequester.changeNodesAmount(event.value as number);
        break;
      case 'frequency':
        this.socketRequester.changeNodesReceivingTime(event.value as number);
        break;
    }
  }
}
