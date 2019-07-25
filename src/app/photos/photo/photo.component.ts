import { Component, OnInit, Input } from '@angular/core';

const cloud = 'http://localhost:3000/imgs/';

@Component({
  selector: 'ap-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() description = '';
  private _url = '';

  constructor() { }

  ngOnInit() {
  }

  @Input() set url(url: string) {

    if (url && url.startsWith('data')) {
        this._url = url;
    } else {
        this._url = cloud + url;
    }
}

get url() {
    return this._url;
}

}
