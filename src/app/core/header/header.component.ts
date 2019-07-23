import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() title = '';

  user$: Observable<User>;
  // user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
    // this.user$.subscribe(user => this.user = user);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }


}
