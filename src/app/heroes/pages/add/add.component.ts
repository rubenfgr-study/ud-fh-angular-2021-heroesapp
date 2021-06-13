import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publisher = Publisher;
  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    public dialog: MatDialog,
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('add')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
        .subscribe((hero) => (this.hero = hero));
    }
  }

  save() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    if (this.hero.id) {
      this.heroesService.updateHero(this.hero).subscribe((hero) => {
        this.hero = hero;
        this.openSnackBar('El Héroe se agregó');
      });
    } else {
      this.heroesService.addHero(this.hero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.openSnackBar('El Héroe se actualizó');
      });
    }
  }

  remove() {
    this.dialog
      .open(ConfirmComponent, { data: { hero: this.hero }, width: '250px' })
      .afterClosed()
      .subscribe((ok) => {
        if (ok) {
          if (this.hero && this.hero.id) {
            this.heroesService.deleteHero(this.hero.id).subscribe(
              () => {
                this.router.navigate(['/heroes']);
                this.openSnackBar('El Héroe se eliminó');
              },
              () => {
                this.openSnackBar('No se encontró ningún Héroe con ese id');
              }
            );
          }
        }
      });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Ok!', { duration: 2500 });
  }
}
