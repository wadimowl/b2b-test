import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesComponent } from './nodes.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { NodesModule } from './nodes.module';
import {
  FakeSocketListenerService
} from '../../services/fake-socket/service/fake-socket-listener/fake-socket-listener.service';
import {
  FakeSocketRequesterFacade
} from '../../services/fake-socket/service/fake-socket-requester/fake-socket-requester-facade';
import { of } from 'rxjs';
import { ProtoColorNodeWithData } from '../../../protobuffs';

describe('NodesComponent', () => {
  let component: NodesComponent;
  let fixture: ComponentFixture<NodesComponent>;
  const mockData: ProtoColorNodeWithData[] = [
    new ProtoColorNodeWithData({ id: '1', float: 1, int: 1, color: '#ffffff', child: { id: '1', color: '#ffffff' } }),
  ]

  beforeEach(async () => {
    const spyListener = jasmine.createSpyObj('FakeSocketListenerService', ['colorsNodesMessages']);
    const spyRequester = jasmine.createSpyObj('FakeSocketRequesterFacade', ['changeNodesReceivingTime', 'changeNodesAmount']);
    spyListener.colorsNodesMessages.and.returnValue(of(mockData));
    await TestBed.configureTestingModule({
      declarations: [NodesComponent],
      imports: [NodesModule],
      providers: [
        { provide: FakeSocketListenerService, useValue: spyListener },
        { provide: FakeSocketRequesterFacade, useValue: spyRequester },
      ],
    })
      .overrideComponent(NodesComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(NodesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call changeNodesReceivingTime on controlParamsChanged', () => {
    const spy = TestBed.inject(FakeSocketRequesterFacade).changeNodesReceivingTime;
    component.controlParamsChanged({ id: 'frequency', value: 10 });
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should call changeNodesAmount on controlParamsChanged', () => {
    const spy = TestBed.inject(FakeSocketRequesterFacade).changeNodesAmount;
    component.controlParamsChanged({ id: 'amount', value: 10 });
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should call ids$.next on controlParamsChanged', () => {
    spyOn(component['ids$'], 'next');
    const value = ['1', '2'];
    component.controlParamsChanged({ id: 'ids', value });
    expect(component['ids$'].next).toHaveBeenCalledWith(value);
  });

  it('data$ depends on ids$', (done) => {
    const id = '1';
    component.controlParamsChanged({ id: 'ids', value: [id] });
    component.data$.subscribe(data => {
      expect(data[0]?.id).toEqual(id);
      done();
    })
  });
});
