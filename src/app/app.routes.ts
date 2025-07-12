import { Routes } from '@angular/router';
import { AppLayout } from './components/layout/app.layout';
import { MoviesComponent } from './components/movies/movies.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { FormsComponent } from './components/forms/forms.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import { RecognitionComponent } from './components/recognition/recognition.component';
export const routes: Routes = [
    // {
    //     path: 'test',
    //     component: AppLayout,
    //     children: [
    //         { path: '', component: MoviesComponent },
    //         // { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
    //         // { path: 'documentation', component: Documentation },
    //         // { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
    //     ]
    // },
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'reconocimiento',
        component: RecognitionComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];
