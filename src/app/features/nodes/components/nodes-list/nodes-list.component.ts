import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorNode } from '../../../../services/fake-socket/types/color-node';
import { ProtoColorNodeWithData } from '../../../../../protobuffs';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesListComponent {
  @Input() data: ProtoColorNodeWithData[] = [];

  trackById(index: number, node: ColorNode): ProtoColorNodeWithData['id'] {
    return node.id;
  }
}
