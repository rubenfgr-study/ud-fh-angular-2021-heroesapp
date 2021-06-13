import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Hero[] = [];
  selectedHero!: Hero | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  search() {
    this.heroesService.searchHeroes(this.term).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    const hero: Hero = event.option.value;

    if (!hero) {
      this.selectedHero = undefined;
      return;
    }

    this.term = hero.superhero;
    this.heroesService.getHero(hero.id!).subscribe((hero) => {
      this.selectedHero = hero;
    });
  }
}
