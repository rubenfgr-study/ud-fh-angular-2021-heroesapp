import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(hero: Hero): string {
    return `assets/heroes/${hero.id}.jpg`;
  }
}
