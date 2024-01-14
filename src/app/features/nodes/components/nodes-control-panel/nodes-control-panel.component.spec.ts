import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NodesControlPanelComponent } from './nodes-control-panel.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { NodesControlPanelModule } from './nodes-control-panel.module';
import { environment } from '../../../../../environments/environment';

describe('NodesControlPanelComponent', () => {
  let component: NodesControlPanelComponent;
  let fixture: ComponentFixture<NodesControlPanelComponent>;
  let amountInput: HTMLInputElement;
  let idsInput: HTMLInputElement;
  let frequencyInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodesControlPanelComponent ],
      imports: [NodesControlPanelModule],
    })
    .overrideComponent(NodesControlPanelComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodesControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    frequencyInput = fixture.nativeElement.querySelectorAll('input')[0];
    amountInput = fixture.nativeElement.querySelectorAll('input')[1];
    idsInput = fixture.nativeElement.querySelectorAll('input')[2];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Has 3 inputs with labels', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('input').length).toBe(3);
    expect(compiled.querySelectorAll('label').length).toBe(3);
  });

  describe('Frequency input', () => {
    it('Has default value', () => {
      expect(component.form.get('frequency')?.value).toBe(environment.frequency);
    });

    it('Has required validator', () => {
      frequencyInput.value = '';
      frequencyInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.get('frequency')?.hasError('required')).toBeTruthy();
    });

    it('Has required OnlyNumbers validator', () => {
      frequencyInput.value = 'abc';
      frequencyInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.get('frequency')?.hasError('pattern')).toBeTruthy();
    });

    it('Emits event on change', fakeAsync(() => {
      spyOn(component.paramsChange, 'emit');
      frequencyInput.value = '10';
      frequencyInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.valid).toBeTruthy();
      tick(601);
      expect(component.paramsChange.emit).toHaveBeenCalled();
      expect(component.paramsChange.emit).toHaveBeenCalledWith({ id: 'frequency', value: 10 });
    }));
  });

  describe('Amount input', () => {
    it('Has default value', () => {
      expect(component.form.get('amount')?.value).toBe(environment.colorNodesAmount);
    });

    it('Has required validator', () => {
      amountInput.value = '';
      amountInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.get('amount')?.hasError('required')).toBeTruthy();
    });

    it('Has required OnlyNumbers validator', () => {
      amountInput.value = 'abc';
      amountInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.get('amount')?.hasError('pattern')).toBeTruthy();
    });

    it('Emits event on change', fakeAsync(() => {
      spyOn(component.paramsChange, 'emit');
      amountInput.value = '10';
      amountInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.valid).toBeTruthy();
      tick(601);
      expect(component.paramsChange.emit).toHaveBeenCalled();
      expect(component.paramsChange.emit).toHaveBeenCalledWith({ id: 'amount', value: 10 });
    }));
  });

  describe('Ids input', () => {
    it('Empty by default', () => {
      expect(component.form.get('ids')?.value).toBe('');
    });

    it('Can has only numbers divided by comma', () => {
      const changeInputValue = (value: string) => {
        idsInput.value = value;
        idsInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
      };
      changeInputValue('1,2,3');
      expect(component.form.get('ids')?.valid).toBeTruthy();

      changeInputValue('1,2,');
      expect(component.form.get('ids')?.hasError('pattern')).toBeTruthy();

      changeInputValue('a');
      expect(component.form.get('ids')?.hasError('pattern')).toBeTruthy();
    });

    it('can has unique numbers', () => {
      const changeInputValue = (value: string) => {
        idsInput.value = value;
        idsInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
      };
      changeInputValue('1,2,3');
      expect(component.form.get('ids')?.valid).toBeTruthy();

      changeInputValue('1,2,1');
      expect(component.form.get('ids')?.hasError('hasDuplicate')).toBeTruthy();
    });

    it('Emits event on change', fakeAsync(() => {
      spyOn(component.paramsChange, 'emit');
      idsInput.value = '1,2,3';
      idsInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.valid).toBeTruthy();
      tick(601);
      expect(component.paramsChange.emit).toHaveBeenCalled();
      expect(component.paramsChange.emit).toHaveBeenCalledWith({ id: 'ids', value: ['1', '2', '3'] });
    }));
  });

  it('Output do not emit event if form is invalid', fakeAsync(() => {
    spyOn(component.paramsChange, 'emit');
    idsInput.value = '1,2,3';
    idsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    tick(601);
    expect(component.paramsChange.emit).toHaveBeenCalled();
    component.form.get('ids')?.setValue('1,2,');
    tick(601);
    expect(component.paramsChange.emit).toHaveBeenCalledTimes(1);
  }));

  it('Output emitter has debounceTime 600', fakeAsync(() => {
    spyOn(component.paramsChange, 'emit');
    idsInput.value = '1,2,3';
    idsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    tick(599);
    expect(component.paramsChange.emit).not.toHaveBeenCalled();
    tick(600);
    expect(component.paramsChange.emit).toHaveBeenCalled();
  }));
});
