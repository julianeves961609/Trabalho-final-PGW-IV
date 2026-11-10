import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Imovel, ImovelService } from '../../imovel.service';

@Component({
  selector: 'app-vitrine',
  imports: [FormsModule, RouterLink],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine implements OnInit {
  private service = inject(ImovelService);

  imoveis = signal<Imovel[]>([]);
  carregando = signal(true);
  erro = signal('');

  // filtros e ordenação
  busca = signal('');
  finalidade = signal('');
  tipo = signal('');
  bairro = signal('');
  dormitorios = signal(0);
  ordem = signal('recentes');

  // paginação
  pagina = signal(1);
  porPagina = 6;

  // opções dos filtros, tiradas da própria lista
  finalidades = computed(() => this.unicos(this.imoveis().map(i => i.finalidade)));
  tipos = computed(() => this.unicos(this.imoveis().map(i => i.tipoImovel?.nome)));
  bairros = computed(() => this.unicos(this.imoveis().map(i => i.bairro?.nome)));

  filtrados = computed(() => {
    const texto = this.busca().toLowerCase().trim();

    const lista = this.imoveis().filter(i =>
      (!texto ||
        (i.titulo ?? '').toLowerCase().includes(texto) ||
        (i.descricao ?? '').toLowerCase().includes(texto)) &&
      (!this.finalidade() || i.finalidade === this.finalidade()) &&
      (!this.tipo() || i.tipoImovel?.nome === this.tipo()) &&
      (!this.bairro() || i.bairro?.nome === this.bairro()) &&
      (i.dormitorios ?? 0) >= this.dormitorios()
    );

    return [...lista].sort((a, b) => {
      if (this.ordem() === 'menor') return this.preco(a) - this.preco(b);
      if (this.ordem() === 'maior') return this.preco(b) - this.preco(a);
      return b.id - a.id; // mais recentes primeiro
    });
  });

  totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / this.porPagina))
  );

  paginaAtual = computed(() => {
    const inicio = (this.pagina() - 1) * this.porPagina;
    return this.filtrados().slice(inicio, inicio + this.porPagina);
  });

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => {
        this.imoveis.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os imóveis. Tente novamente mais tarde.');
        this.carregando.set(false);
      }
    });
  }

  // volta para a primeira página quando um filtro muda
  mudou() {
    this.pagina.set(1);
  }

  limpar() {
    this.busca.set('');
    this.finalidade.set('');
    this.tipo.set('');
    this.bairro.set('');
    this.dormitorios.set(0);
    this.ordem.set('recentes');
    this.pagina.set(1);
  }

  anterior() {
    if (this.pagina() > 1) this.pagina.update(p => p - 1);
  }

  proxima() {
    if (this.pagina() < this.totalPaginas()) this.pagina.update(p => p + 1);
  }

  private preco(i: Imovel): number {
    return i.precoVenda ?? i.precoAluguel ?? 0;
  }

  private unicos(valores: (string | undefined | null)[]): string[] {
    return [...new Set(valores.filter((v): v is string => !!v))].sort();
  }
}