import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TypesPageComponent } from './types-page/types-page.component';

const routes: Routes = [
  //{ path: "**", redirectTo: "", pathMatch: "full" },
  { path: "", component: TypesPageComponent },
  { path: "types", component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
