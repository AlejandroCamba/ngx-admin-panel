import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LazyLoaderService {
  private lazyMap: Map<string, Promise<unknown>> = new Map();

  constructor() {}

  getLazyModule(key: string): Promise<unknown> {
    return this.lazyMap.get(key);
  }

  loadLazyModules(name, importWhat): Observable<number | void> {
    return of(1).pipe(
      delay(2000),
      tap(() => {
        this.lazyMap.set(
          name, importWhat
        );
      })
    );
  }
}