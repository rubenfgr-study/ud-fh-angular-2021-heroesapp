import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  hero!: Hero;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    /* const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.heroesService.getHero(id).subscribe(
      (hero) => {
        this.hero = hero;
      },
      () => this.router.navigateByUrl('/heroes/list')
    ); */
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe((hero) => (this.hero = hero));
  }
}
