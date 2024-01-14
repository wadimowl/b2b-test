import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesControlPanelComponent } from './nodes-control-panel.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NodesControlPanelComponent
  ],
  exports: [
    NodesControlPanelComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class NodesControlPanelModule { }
