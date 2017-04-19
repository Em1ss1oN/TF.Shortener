import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UriComponent } from './uri.component';
import { LinksListComponent } from './linkslist.component';
import { LoginComponent } from './login.component';
import { RouterModule, Router } from '@angular/router';
import { MembershipService } from './membership.service';

@Component({
    selector: 'my-app',
    templateUrl: './Components/app.html',

})
export class AppComponent implements OnInit {
    ngOnInit(): void {
    }
}
