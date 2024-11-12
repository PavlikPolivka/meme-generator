import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemeComponent } from './components/meme/meme.component'


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meme', component: MemeComponent },
  { path: '**', redirectTo: '' },
];
