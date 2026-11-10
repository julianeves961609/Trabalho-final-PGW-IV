import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Imovel, ImovelService } from '../../imovel.service';

@Component({
  selector: 'app-detalhe',
  imports: [RouterLink],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class Detalhe implements OnInit {
  private service = inject(ImovelService);
  private rota = inject(ActivatedRoute);

  imovel = signal<Imovel | null>(null);
  carregando = signal(true);
  erro = signal('');

  // troque pelo e-mail real da imobiliária
  emailContato = 'contato@imobiliaria.com';

  ngOnInit() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));

    this.service.buscar(id).subscribe({
      next: (imovel) => {
        this.imovel.set(imovel);
        this.carregando.set(false);
      },
      error: (e) => {
        this.erro.set(
          e.status === 404
            ? 'Imóvel não encontrado.'
            : 'Não foi possível carregar o imóvel. Tente novamente mais tarde.'
        );
        this.carregando.set(false);
      }
    });
  }

  linkContato(): string {
    const i = this.imovel();
    const assunto = encodeURIComponent(`Interesse no imóvel: ${i?.titulo}`);
    const corpo = encodeURIComponent(
      `Olá! Tenho interesse no imóvel "${i?.titulo}" (código ${i?.id}). Gostaria de mais informações.`
    );
    return `mailto:${this.emailContato}?subject=${assunto}&body=${corpo}`;
  }
}