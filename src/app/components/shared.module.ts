import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CategoryFilterPipe } from '../pipes/category-filter.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavBarComponent,
    CategoryFilterPipe
  ],
  exports: [
    NavBarComponent,
    CategoryFilterPipe
  ],
})
export class SharedModule { }
