import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccine } from '../model/vaccine';
import { create } from 'domain';

@Injectable({
providedIn: 'root',
})
export class VaccineService {
private readonly apiUrl = 'https://musical-computing-machine-6jgr57g9p9qhj75-8080.app.github.dev/vaccines';

constructor(private http: HttpClient) {}

createVaccine(vaccine: Vaccine): Observable<Vaccine> {
    return this.http.post<Vaccine>(`${this.apiUrl}/create`, vaccine);
}

updateVaccine(id: number, vaccine: Vaccine): Observable<Vaccine> {
    return this.http.put<Vaccine>(`${this.apiUrl}/${id}`, vaccine);
}

deleteVaccine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}


getVaccineById(id: number): Observable<Vaccine> {
    return this.http.get<Vaccine>(`${this.apiUrl}/${id}`);
}

getAllVaccines(): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(this.apiUrl);
}

getVaccinesByActive(active: string): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.apiUrl}/active/${active}`);
}

inactivateVaccine(id: number): Observable<Vaccine> {
    return this.http.patch<Vaccine>(`${this.apiUrl}/${id}/inactivate`, null);
}

activateVaccine(id: number): Observable<Vaccine> {
    return this.http.patch<Vaccine>(`${this.apiUrl}/activate/${id}`, null);
}

}
