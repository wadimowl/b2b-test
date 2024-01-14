import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeSocketRequesterFacade } from './services/fake-socket-requester/fake-socket-requester-facade';
import { FakeSocketListenerService } from './services/fake-socket-listener/fake-socket-listener.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    FakeSocketRequesterFacade,
    FakeSocketListenerService,
  ],
})
export class FakeSocketModule { }
