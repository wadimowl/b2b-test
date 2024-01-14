import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesListComponent } from './nodes-list.component';
import { ProtoColorNodeWithData } from '../../../../../protobuffs';
import { NodesListModule } from './nodes-list.module';
import { ChangeDetectionStrategy } from '@angular/core';

describe('NodesListComponent', () => {
  let component: NodesListComponent;
  let fixture: ComponentFixture<NodesListComponent>;
  const mockData: ProtoColorNodeWithData[] = [
    new ProtoColorNodeWithData({ id: '1', float: 1, int: 1, color: '#ffffff', child: { id: '1', color: '#ffffff' } }),
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodesListComponent ],
      imports: [NodesListModule],
    })
    .overrideComponent(NodesListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Has 5 columns', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('th').length).toBe(5);
  });

  it('Node represented as row', () => {
    component.data = mockData;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody>tr').length).toBe(1);
  });

  it('trackById returns id', () => {
    const id = component.trackById(0, mockData[0]);
    expect(id).toBe(mockData[0].id);
  });

  it('Row render node`s data properly', () => {
    component.data = mockData;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const row = compiled.querySelector('tbody>tr');
    expect(row.querySelector('td:nth-child(1)').textContent).toBe(mockData[0].id);
    expect(row.querySelector('td:nth-child(2)').textContent).toBe(mockData[0].float.toString());
    expect(row.querySelector('td:nth-child(3)').textContent).toBe(mockData[0].int.toString());
    expect(row.querySelector('td:nth-child(4)').textContent).toBe(mockData[0].color);
  });

  it('Fourth body column has correct background in span', () => {
    component.data = mockData;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('tbody td:nth-child(4) span');
    expect(span.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });
});
