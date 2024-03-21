import {
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ApiService } from './api.service';
import { Animal } from '@core/interfaces';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  #apiService = inject(ApiService);
  #destroyRef = inject(DestroyRef);

  #animals = signal<Animal[]>([]);
  #isLoadingAnimals = signal<boolean>(false);
  public animalsState = computed(() => ({
    animals: this.#animals(),
    isLoadingAnimals: this.#isLoadingAnimals(),
  }));

  getAnimals(): Subscription {
    this.#isLoadingAnimals.set(true);
    return this.#apiService
      .getAll<Animal[]>('animals')
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (response) => {
          this.#animals.set(response);
          this.#isLoadingAnimals.set(false);
        },
        error: (error) => console.log(error),
      });
  }
}
