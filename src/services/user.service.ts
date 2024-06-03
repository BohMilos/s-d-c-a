import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      tap((users) => console.log('Users received:', users)),
      catchError(this.handleError)
    );
  }

  getDetailedUserInfo(userId: number): Observable<any> {
    const userDetailsUrl = `https://dummyjson.com/users/${userId}`;
    return this.http.get<any>(userDetailsUrl).pipe(
      tap((userInfo) => console.log('User details received:', userInfo)),
      catchError(this.handleError)
    );
  }

  getUserInfoByPostalCode(postalCode: string): Observable<any> {
    const userInfoUrl = `https://api.zippopotam.us/us/${postalCode}`;
    return this.http.get<any>(userInfoUrl).pipe(
      tap((userInfo) => console.log('User info by postal code received:', userInfo)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while fetching data.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
