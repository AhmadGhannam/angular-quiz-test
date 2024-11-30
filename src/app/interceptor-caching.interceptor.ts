import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>(); // Stores cached responses

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignore POST, PUT, DELETE requests (non-cacheable)
    if (req.method !== 'GET') {
      return next.handle(req);
      // POST, PUT, DELETE requests modify data, so caching them isn't appropriate. They bypass the cache.
    }

    const cacheKey = req.urlWithParams; // Unique key for the cache

    // Check if the response is already cached
    if (this.cache.has(cacheKey)) {
      console.log('Serving from cache:', cacheKey);
      return of(this.cache.get(cacheKey)); // Return cached response
    }

    // Otherwise, send the request and cache the response
    return next.handle(req).pipe(
      tap((response) => {
        console.log('Caching response for:', cacheKey);
        this.cache.set(cacheKey, response);
      })
    );
  }
}
