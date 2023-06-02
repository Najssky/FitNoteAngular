import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrapModules = [NgbNavModule];
@NgModule({
  imports: [CommonModule, ...bootstrapModules],
  exports: [...bootstrapModules],
})
export class NgBootstrapModule {}
