import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [],
  imports: [MaterialModule,],
  exports: [MaterialModule,],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
