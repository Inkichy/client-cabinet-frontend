import { NgModule } from '@angular/core';
import { SidebarAuthComponent } from './sidebar-auth.component';
import { LogoModule } from '../logo/logo.module';
import { SlickModule } from 'src/app/directives/slick/slick.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarAuthComponent],
  imports: [LogoModule, SlickModule, RouterModule],
  exports: [SidebarAuthComponent]
})
export class SidebarAuthModule {}
