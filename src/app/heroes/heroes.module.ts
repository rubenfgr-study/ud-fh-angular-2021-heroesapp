import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { AddComponent } from './pages/add/add.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SearchComponent } from './pages/search/search.component';
import { ImagePipe } from './pipes/image.pipe';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    HeroComponent,
    HomeComponent,
    ListComponent,
    HeroCardComponent,
    ImagePipe,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [HeroesRoutingModule],
})
export class HeroesModule {}
