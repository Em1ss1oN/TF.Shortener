import { Injectable } from '@angular/core'
import { ShortLink } from './shortlink'
import { Headers, Http, Response } from '@angular/http'

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShortLinkService {
    constructor(private http: Http) {
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'api/short';  

    shortenLink(link: String) : Observable<String> {
        return this.http.post(this.apiUrl, JSON.stringify({ 'Link' : link}), { 'headers': this.headers }).map((response:
            Response) => {
            let shortLink = new ShortLink().deserialize(response.json());
            return shortLink.getShortUriString();
        });
    }

    getAllLinks(): Observable<ShortLink[]> {
        return this.http.get(this.apiUrl, { 'headers': this.headers }).map((response:
            Response) => {
            let  array = response.json();
            let result = new Array<ShortLink>();
            if (array instanceof Array) {
                array.forEach(item => {
                    let shortLink = new ShortLink().deserialize(item);
                    result.push(shortLink);
                });
            }
            return result;
        });
    }
}