import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShortLink } from './shortlink';
import { User } from './user';
import { ShortLinkService } from './shortlink.service';
import { MembershipService } from './membership.service';

@Component({
    selector: 'my-linksList',
    templateUrl: './Components/linkslist.html',

})
export class LinksListComponent implements OnInit {

    user: User;
    links: Observable<ShortLink[]>;
    error = false;
    errorText;
    inProgress = false;

    constructor(private shortLinkService: ShortLinkService, private membershipService: MembershipService) {
    }

    ngOnInit(): void {
        this.user = this.membershipService.getLoggedInUser();
        this.loadLinks();
    }

    loadLinks(): void {
        this.inProgress = true;
        this.links = this.shortLinkService.getAllLinks();
        this.inProgress = false;
    }
}