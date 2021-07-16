import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuardAuthService} from './core/services/guard-auth.service';
import {EsiaLoginComponent} from './pages/esia-login/esia-login.component';
import { SwaggerComponent } from './pages/swagger/swagger.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'agreement-page',
    loadChildren: () =>
      import('./pages/agreement-page/agreement-page.module').then(m => m.AgreementPageModule)
  },
  {
    path: 'password-change',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/password-change/password-change.module').then(m => m.PasswordChangeModule)
  },
  {
    path: 'password-change-form',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/password-change-form/password-change-form.module').then(m => m.PasswordChangeFormModule)
  },
  {
    path: 'what-is-iis',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/what-is-iis/what-is-iis.module').then(m => m.WhatIsIISModule)
  },
  {
    path: 'account-customer-questionnaire',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/account-customer-questionnaire/account-customer-questionnaire.module').then(m => m.AccountCustomerQuestionnaireModule)
  },
  {
    path: 'investment-profile',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/investment-profile/investment-profile.module').then(m => m.InvestProfileModule)
  },
  {
    path: 'online-request',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/online-request/online-request.module').then(m => m.OnlineRequestModule)
  },
  {
    path: 'online-request/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/online-request/online-request.module').then(m => m.OnlineRequestModule)
  },
  {
    path: 'select-product',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/select-product/select-product.module').then(m => m.SelectProductModule)
  },
  {
    path: 'faq',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'trust-management',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/trust-management/trust-management.module').then(
        m => m.TrustManagementModule
      )
  },
  {
    path: 'trust-management/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/trust-management-detail/trust-management-detail.module').then(
        m => m.TrustManagementDetailModule
      )
  },
  {
    path: 'broker-service',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/broker-service/broker-service.module').then(
        m => m.BrokerServiceModule
      )
  },
  {
    path: 'broker-service/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/broker-service-detail/broker-service-detail.module').then(
        m => m.BrokerServiceDetailModule
      )
  },
  {
    path: 'account',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/account/account.module').then(
        m => m.AccountModule
      )
  },
  {
    path: 'site-map',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/site-map/site-map.module').then(
        m => m.SiteMapModule
      )
  },
  {
    path: 'payment',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/payment/payment.module').then(
        m => m.PaymentModule
      )
  },
  {
    path: 'payment-details/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/payment-details/payment-details.module').then(
        m => m.PaymentDetailsModule
      )
  },
  {
    path: 'payment/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/payment/payment.module').then(
        m => m.PaymentModule
      )
  },
  {
    path: 'tm-purchase/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/tm-purchase/tm-purchase.module').then(
        m => m.TmPurchaseModule
      ),
    data: {mode: 1}
  },
  {
    path: 'tm-purchase-step-two',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/tm-purchase-step-two/tm-purchase-step-two.module').then(
        m => m.TmPurchaseStepTwoModule
      )
  },
  {
    path: 'tm-purchase-step-three/:id',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/tm-purchase-step-three/tm-purchase-step-three.module').then(
        m => m.TmPurchaseStepThreeModule
      )
  },
  {
    path: 'tm-purchase-step-four',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/tm-purchase-step-four/tm-purchase-step-four.module').then(
        m => m.TmPurchaseStepFourModule
      )
  },
  {
    path: 'portfolio',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/portfolio/portfolio.module').then(
        m => m.PortfolioModule
      )
  },
  {
    path: 'welcome',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(
        m => m.WelcomeModule
      )
  },
  {
    path: 'notices',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/notices/notices.module').then(
        m => m.NoticesModule
      )
  },
  {
    path: 'functions',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/functions/functions.module').then(
        m => m.FunctionsModule
      )
  },
  {
    path: 'catalog',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/catalog/catalog.module').then(
        m => m.CatalogModule
      )
  },
  {
    path: 'documents_page',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('./pages/documents-page/documents-page.module').then(
        m => m.DocumentsPageModule
      )
  },
  {
    path: 'esia_login',
    component: EsiaLoginComponent
    // canActivate: [GuardAuthService],
    // loadChildren: () =>
    //   import('./pages/catalog/catalog.module').then(
    //     m => m.CatalogModule
    //   )
  },
  {
    path: 'swagger',
    component: SwaggerComponent
  },
  {path: '**', redirectTo: 'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
