import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'dashboard-nph',
        title: 'Dashboard',
        loadComponent: () => import('./dashboard/pages/dashboard/dashboard.component'),
      },
      {
        path: 'change-detection',
        title: 'Proveedor',
        loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component'),
      },
      {
        path: 'control-flow',
        title: 'Galpon',
        loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component'),
      },
      {
        path: 'defer-options',
        title: 'Alimento',
        loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component'),
      },
      {
        path: 'defer-views',
        title: 'Vacuna',
        loadComponent: () => import('./dashboard/pages/defer-views/defer-views.component'),
      },
      {
        path: 'user',
        title: 'Casa',
        loadComponent: () => import('./dashboard/pages/user/user.component'),
      },
      {
        path: 'user-list',
        title: 'Producto',
        loadComponent: () => import('./dashboard/pages/users/users.component'),
      },
      {
        path: 'view-transition',
        title: 'Ciclo de Vida',
        loadComponent: () => import('./dashboard/pages/view-transition/view-transition.component'),
      },
      {
        path:'', redirectTo: 'dashboard-nph', pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
