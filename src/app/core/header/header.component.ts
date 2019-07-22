import { Component, Input } from '@angular/core';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() title: string = '';

}
