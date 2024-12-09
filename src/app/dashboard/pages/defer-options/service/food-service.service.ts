import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../model/food';
import { FoodInsert } from '../model/food_insert';
import { FoodUpdate } from '../model/food_update';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  private apiUrl = 'https://8080-vallegrandeas222-msfood-61m8ibxkhff.ws-us117.gitpod.io/api/foods';

  constructor(private http: HttpClient) { }

  getActiveFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/actives`);
  }

  getInactiveFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/inactives`);
  }

  addNewFood(food: FoodInsert): Observable<FoodInsert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FoodInsert>(this.apiUrl, food, { headers });
  }

  updateFood(id: number, food: FoodUpdate): Observable<FoodUpdate> {
    return this.http.put<FoodUpdate>(`${this.apiUrl}/${id}`, food);
  }

  deactivateFood(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/delete/${id}`, {}, { responseType: 'text' as 'json' });
  }

  reactivateFood(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/restore/${id}`, {}, { responseType: 'text' as 'json' });
  }


}
