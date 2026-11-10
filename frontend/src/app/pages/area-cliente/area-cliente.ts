import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-area-cliente',
  imports: [],
  templateUrl: './area-cliente.html',
  styleUrl: './area-cliente.css'
})
export class AreaCliente {
  private auth = inject(AuthService);
  private router = inject(Router);

  sair() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}