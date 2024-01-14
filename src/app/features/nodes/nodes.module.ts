import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesComponent } from './nodes.component';
import { NodesControlPanelModule } from './components/nodes-control-panel/nodes-control-panel.module';
import { NodesListModule } from './components/nodes-list/nodes-list.module';

@NgModule({
  declarations: [
    NodesComponent,
  ],
  exports: [
    NodesComponent
  ],
  imports: [
    CommonModule,
    NodesControlPanelModule,
    NodesListModule
  ]
})
export class NodesModule { }
