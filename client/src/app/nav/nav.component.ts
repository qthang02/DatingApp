import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model: any = {};
  item: any = [];

  constructor(public accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.item = [
      {
        label: 'Users',
        icon:'pi pi-fw pi-user',
        items: [
          {label: 'Sign Out', icon: 'pi pi-sign-out', command: (() => this.logout())},
          {label: 'Edit Profile', icon:'pi pi-user-edit', routerLink: "/member/edit"},
        ]
      },
    ];
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next:_ => this.router.navigateByUrl('/members')
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
