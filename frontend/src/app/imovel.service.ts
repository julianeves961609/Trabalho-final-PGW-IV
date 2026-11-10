import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Imovel {
  id: number;
  titulo: string;
  descricao: string;
  precoVenda: number;
  precoAluguel: number;
  finalidade: string;
  status: string;
  dormitorios: number;
  banheiros: number;
  garagem: number;
  areaTotal?: number;
  areaConstruida?: number;
  endereco: string;
  numero: string;
  complemento?: string;
  cep?: string;
  caracteristicas?: string;
  destaque?: boolean;
  bairro?: { id: number; nome: string; cidade: string; estado: string };
  tipoImovel?: { id: number; nome: string };
}

@Injectable({ providedIn: 'root' })
export class ImovelService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/imoveis';

  listar(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.url);
  }

  buscar(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.url}/${id}`);
  }
}