import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

import { IdentityGuard } from './services/identity.guard';

//App routes
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'settings', component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'new-category', component: CategoryNewComponent, canActivate: [IdentityGuard]},
    {path: 'new-post', component: PostNewComponent, canActivate: [IdentityGuard]},
    {path: 'entry/:id', component: PostDetailComponent},
    {path: 'edit/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
    {path: 'category/:id', component: CategoryDetailComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);