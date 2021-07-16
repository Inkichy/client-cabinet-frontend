import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PreloaderComponent } from 'src/app/ui/preloader/preloader.component';

@NgModule({
  declarations: [PreloaderComponent],
  exports: [PreloaderComponent],
  imports: [
    CommonModule,
  ]
})
export class PreloaderModule {}
