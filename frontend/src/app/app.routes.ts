import { Routes } from '@angular/router';
import { perfilGuard } from './auth.guard';
import { Vitrine } from './pages/vitrine/vitrine';
import { Detalhe } from './pages/detalhe/detalhe';
import { Login } from './pages/login/login';
import { AreaCliente } from './pages/area-cliente/area-cliente';
import { PainelAdmin } from './pages/painel-admin/painel-admin';

export const routes: Routes = [
  { path: '', component: Vitrine },
  { path: 'imoveis/:id', component: Detalhe },
  { path: 'login', component: Login },
  { path: 'cliente', component: AreaCliente, canActivate: [perfilGuard('USER')] },
  { path: 'admin', component: PainelAdmin, canActivate: [perfilGuard('ADMIN')] },
  { path: '**', redirectTo: '' }
];