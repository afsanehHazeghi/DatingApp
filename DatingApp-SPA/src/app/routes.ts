import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '', // dummy root, equals to localhost:4200/members yet.
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListComponent},
            {path: 'members', component: MemberListComponent , canActivate: [ AuthGuard ]},
        ],
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}, // for paths that are not matches to our paths.
];
