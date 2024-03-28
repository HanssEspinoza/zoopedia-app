import {
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ApiService } from './api.service';
import { Animal } from '@core/interfaces';
import { Subscription, catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  #apiService = inject(ApiService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  #animals = signal<Animal[]>([]);
  #isLoadingAnimals = signal<boolean>(false);
  public animalsState = computed(() => ({
    animals: this.#animals(),
    isLoadingAnimals: this.#isLoadingAnimals(),
  }));

  #animal = signal<Animal | undefined>(undefined);
  #isLoadingAnimal = signal<boolean>(false);
  public animalState = computed(() => ({
    animal: this.#animal(),
    isLoadingAnimal: this.#isLoadingAnimal(),
  }));

  public search = signal<Animal[]>([]);

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

  getAnimalById(id: string): Subscription {
    this.#isLoadingAnimal.set(true);
    return this.#apiService
      .getById<Animal | undefined>('animals', id)
      .pipe(catchError((error) => of(undefined)))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (animal) => {
          if (!animal) return this.#router.navigate(['/dashboard/list']);

          this.#animal.set(animal);
          this.#isLoadingAnimal.set(false);
          return;
        },
      });
  }

  getSuggestions(query: string) {
    return this.#apiService
      .getAll<Animal[]>(`animals?q=${query}&_limit=6`)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (response) => {
          this.search.set(response);
        },
        error: (err) => console.log(err),
      });
  }
}
