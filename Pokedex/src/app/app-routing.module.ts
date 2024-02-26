import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesPageComponent } from './types-page/types-page.component';
import { MainPage } from './main-page/main-page.component';

const routes: Routes = [
  //{ path: "**", redirectTo: "", pathMatch: "full" },
  { path: "", component: TypesPageComponent },
  { path: "types", component: MainPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
