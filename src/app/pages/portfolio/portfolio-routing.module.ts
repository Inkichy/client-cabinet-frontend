import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioComponent} from './portfolio.component';
import {GuardAuthService} from '../../core/services/guard-auth.service';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  },
  {
    path: ':id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./trust-management/trust-management.module').then(m => m.TrustManagementModule)
  },
  {
    path: ':id/change-tariff',
    canActivate: [GuardAuthService],
    loadChildren: () =>
        import('../tm-purchase/tm-purchase.module').then(m => m.TmPurchaseModule),
    data: { mode: 2 }
  },
  {
    path: ':id/deposit-and-withdrawal-of-funds',
    canActivate: [GuardAuthService],
    loadChildren: () =>
        import('./deposit-and-withdrawal-of-funds/deposit-and-withdrawal-of-funds.module').then(m => m.DepositAndWithdrawalOfFundsModule),
  },
  {
    path: ':id/products-reports',
    canActivate: [GuardAuthService],
    loadChildren: () =>
        import('./poducts-reports/poducts-reports.module').then(m => m.ProductReportsModule),
  },
  {
    path: ':id/signed-contracts',
    canActivate: [GuardAuthService],
    loadChildren: () =>
        import('./signed-contracts/signed-contracts.module').then(m => m.SignedContractModule),
  },
  {
    path: ':id/withdraw-request',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./withdraw-request/withdraw-request.module').then(m => m.WithdrawRequestModule),
  },
  {
    path: ':id/analytics',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./analytics/analytics.module').then(m => m.AnalyticsModule),
  },
  {
    path: ':id/quik',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./quik/quik.module').then(m => m.QuikModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {
}
