import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'services',
    loadChildren: async (): Promise<unknown> =>
      import('./pages/services-catalog-page/service-catalog-page.module').then(module => module.ServiceCatalogPageModule),
  },
  {
    path: '**',
    redirectTo: 'services'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
