import { Component, OnInit, inject, signal } from '@angular/core';
import { Imovel, ImovelService } from './imovel.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private service = inject(ImovelService);

  imoveis = signal<Imovel[]>([]);
  erro = signal('');

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => this.imoveis.set(lista),
      error: () => this.erro.set('Não foi possível carregar os imóveis.')
    });
  }
}