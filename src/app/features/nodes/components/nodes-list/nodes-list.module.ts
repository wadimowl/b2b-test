import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesListComponent } from './nodes-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { NodeItemComponent } from './components/node-item/node-item.component';

@NgModule({
  declarations: [
    NodesListComponent,
    NodeItemComponent
  ],
  exports: [
    NodesListComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ]
})
export class NodesListModule { }
