import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShortLink } from './shortlink';
import { Response } from '@angular/http';
import { ShortLinkService } from './shortlink.service';

@Component({
    selector: 'my-uri',
    templateUrl: './Components/uri.html',

})
export class UriComponent {
    link;
    generated = false;
    error = false;
    inProgress = false;
    errorText;
    @ViewChild('inputLink') input: ElementRef; 

    constructor(private shortLinkService: ShortLinkService) {
    }

    onSubmit() {
        this.error = false;
        this.inProgress = true;
        this.shortLinkService.shortenLink(this.link).subscribe(
            data => {
                this.link = data;
                this.inProgress = false;
                this.generated = true;
                this.input.nativeElement.focus();
                this.input.nativeElement.select();
            },
            (error: Response) => {
                this.error = true;
                this.inProgress = false;
                var data = JSON.parse(error.text());
                var text = data.Message;
                if (text !== undefined) {
                    this.errorText = text;
                } else {
                    this.errorText = error;
                }
            });
    }

    ngAfterViewInit() {
        console.log(this.input.nativeElement);
    }
}