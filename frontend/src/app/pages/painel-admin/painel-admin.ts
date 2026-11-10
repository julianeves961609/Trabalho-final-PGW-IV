import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

@Component({
  selector: 'app-painel-admin',
  imports: [],
  templateUrl: './painel-admin.html',
  styleUrl: './painel-admin.css'
})
export class PainelAdmin implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private router = inject(Router);

  usuarios = signal<Usuario[]>([]);
  erro = signal('');

  ngOnInit() {
    this.http.get<Usuario[]>('http://localhost:8080/users').subscribe({
      next: (lista) => this.usuarios.set(lista),
      error: (e) => {
        // o 401 já é tratado pelo interceptor (logout e redirecionamento)
        if (e.status === 403) {
          this.erro.set('Você não tem permissão para ver esta lista.');
        } else if (e.status !== 401) {
          this.erro.set('Não foi possível carregar os usuários.');
        }
      }
    });
  }

  sair() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}