import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class TableService {
    constructor(private http: HttpClient ) {}
    getCapcoTable() {
        return this.http.get('/assets/capco.json');
    }
    setPostcall(data) {
        this.http.post('/api/submit', {
            'rowId': data.id,
            'rowStatus': data.status
        }).subscribe(
            (val) => {
                console.log('POST call successful ', 
                            val);
            },
            response => {
                console.log('POST call in error', response);
            },
            () => {
                console.log('The POST  completed.');
            });
    }
}