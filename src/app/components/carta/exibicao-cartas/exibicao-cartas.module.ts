import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderModule } from '../../shared/loader/loader.module';
import { ExibicaoCartasComponent } from './exibicao-cartas.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    ExibicaoCartasComponent
  ],
  exports: [
    ExibicaoCartasComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [ExibicaoCartasComponent]
})
export class ExibicaoCartaModule  {}
