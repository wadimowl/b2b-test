import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco-root.module';
import { FakeSocketModule } from './services/fake-socket/fake-socket.module';
import { NodesModule } from './features/nodes/nodes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FakeSocketModule,
    TranslocoRootModule,
    NodesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
