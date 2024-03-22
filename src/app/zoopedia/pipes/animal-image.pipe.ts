import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from '@core/interfaces';

@Pipe({
  name: 'animalImage',
  standalone: true,
})
export class AnimalImagePipe implements PipeTransform {
  transform(animal: Animal): string {
    if (!animal.id && !animal.alt_img) return 'assets/no-image.jpeg';

    if (animal.alt_img) return animal.alt_img; //https://google.com/gorilla

    return `assets/animals/${animal.id}.jpeg`;
  }
}
