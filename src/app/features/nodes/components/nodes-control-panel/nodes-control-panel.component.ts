import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NodesControlPanelForm } from './types/nodes-control-panel-form';
import { environment } from '../../../../../environments/environment';
import { uniqueNumbersValidator } from './validators/unique-numbers.validator';
import { debounceTime, filter, Subscription } from 'rxjs';
import { NodeControlPanelEvent } from './types/node-control-panel-event';
import { INTEGER_DIVIDED_BY_COMMA, ONLY_NUMBERS } from '../../../../lib/regexps';

const onlyNumbersValidation = Validators.pattern(ONLY_NUMBERS);

@Component({
  selector: 'app-nodes-control-panel',
  templateUrl: './nodes-control-panel.component.html',
  styleUrls: ['./nodes-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesControlPanelComponent implements OnDestroy {
  readonly subscription = new Subscription();
  @Output() paramsChange = new EventEmitter<NodeControlPanelEvent>();
  readonly form: FormGroup<NodesControlPanelForm> = this.builder.group({
    amount: [environment.colorNodesAmount, [Validators.required, onlyNumbersValidation]],
    frequency: [environment.frequency, [Validators.required, onlyNumbersValidation]],
    ids: ['', [Validators.pattern(INTEGER_DIVIDED_BY_COMMA), uniqueNumbersValidator()]],
  });

  constructor(private builder: NonNullableFormBuilder) {
    const controlNames: (keyof NodesControlPanelForm)[] = ['amount', 'frequency', 'ids'];
    controlNames.forEach(name => {
      this.subscription.add(this.form.get(name)?.valueChanges.pipe(
        debounceTime(600),
        filter(() => this.form.valid),
      ).subscribe(value => {
        const newValue = name === 'ids' ? (value as string).split(',').filter(Boolean) : Number(value);
        const result: NodeControlPanelEvent = { id: name, value: newValue };
        this.paramsChange.emit(result);
      }));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
