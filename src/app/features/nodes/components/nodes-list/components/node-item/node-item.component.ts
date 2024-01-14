import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorNode } from '../../../../../../services/fake-socket/types/color-node';

@Component({
  selector: 'td [app-node-item]',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeItemComponent {
  @Input() node!: ColorNode;
}
