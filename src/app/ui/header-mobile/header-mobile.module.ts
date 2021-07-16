import { NgModule } from '@angular/core';
import { HeaderMobileComponent } from './header-mobile.component';
import { HeaderBurgerModule } from '../header-burger/header-burger.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, HeaderBurgerModule],
  declarations: [HeaderMobileComponent],
  exports: [HeaderMobileComponent]
})
export class HeaderMobileModule {}
