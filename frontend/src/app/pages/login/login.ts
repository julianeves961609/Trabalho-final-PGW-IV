import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });

  enviando = signal(false);
  erro = signal('');

  entrar() {
    this.erro.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    const { email, senha } = this.form.getRawValue();

    this.auth.login(email, senha).subscribe({
      next: (resposta) => {
        this.enviando.set(false);
        this.router.navigateByUrl(resposta.tipo === 'ADMIN' ? '/admin' : '/cliente');
      },
      error: (e) => {
        this.enviando.set(false);

        if (e.status === 401) {
          this.erro.set('E-mail ou senha incorretos.');
        } else if (e.status === 0) {
          this.erro.set('Não foi possível conectar ao servidor. Tente novamente em instantes.');
        } else {
          this.erro.set('Erro no servidor. Tente novamente mais tarde.');
        }
      }
    });
  }
}