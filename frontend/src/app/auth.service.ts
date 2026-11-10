import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface LoginResposta {
  token: string;
  tipo: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/public/login';

  private tokenSig = signal<string | null>(localStorage.getItem('token'));
  private tipoSig = signal<string | null>(localStorage.getItem('tipo'));

  // usados no menu (atualizam a tela sozinhos)
  logado = computed(() => !!this.tokenSig());
  tipo = computed(() => this.tipoSig());

  login(email: string, senha: string): Observable<LoginResposta> {
    return this.http.post<LoginResposta>(this.url, { email, senha }).pipe(
      tap((resposta) => {
        localStorage.setItem('token', resposta.token);
        localStorage.setItem('tipo', resposta.tipo);
        this.tokenSig.set(resposta.token);
        this.tipoSig.set(resposta.tipo);
      })
    );
  }

  getToken(): string | null {
    return this.tokenSig();
  }

  getTipo(): string | null {
    return this.tipoSig();
  }

  estaLogado(): boolean {
    return !!this.tokenSig();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    this.tokenSig.set(null);
    this.tipoSig.set(null);
  }
}