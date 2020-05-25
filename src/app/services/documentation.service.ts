import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class DocumentationService {
  constructor(private http: HttpClient) {}

  updateDocumentation(projectId: number, data) {
    return this.http
      .put<any>(`api/project/${projectId}/documentation/`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  saveDocumentation(projectId: number){
    return this.http
    .get<any>(`api/project/${projectId}/documentation/`)
    .pipe(catchError((e) => throwError(e)));
  }
}
