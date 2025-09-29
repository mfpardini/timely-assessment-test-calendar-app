import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerFullComponent } from './components/spinner-full/spinner-full.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// everithing in a shared module must be exported
const declarations = [SpinnerFullComponent, SafeHtmlPipe];

@NgModule({
  declarations: declarations,
  imports: [NgSelectModule, FormsModule],
  exports: declarations,
})
export class SharedModule {}
