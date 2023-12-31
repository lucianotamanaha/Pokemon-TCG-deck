import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ResponseCarta } from '../models/response-carta';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {
  private baseUrlConsultar: string = environment.apiPokemon + '/cards';

  constructor(private http: HttpClient) { }

  public buscarTodasCartas(): Observable<ResponseCarta> {
    return this.get();
  }

  public buscarTodasCartasPaginado(pagina: number, tamanhoPagina: number): Observable<ResponseCarta> {
    const QUERY_STRING = `?page=${pagina}&pageSize=${tamanhoPagina}`;
    return this.get(QUERY_STRING);
  }

  public buscarTodasCartasPaginadoPorNome(pagina: number, tamanhoPagina: number, filtro: string): Observable<ResponseCarta> {
    const QUERY_STRING = `?page=${pagina}&pageSize=${tamanhoPagina}&name=${filtro}`;
    return this.get(QUERY_STRING);
  }

  private get(queryString: string = ""): Observable<ResponseCarta> {
    const API_URL = this.baseUrlConsultar;
    return this.http.get<ResponseCarta>(`${API_URL}${queryString}`).pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return throwError(() => new Error('Your error'));
  }
}
