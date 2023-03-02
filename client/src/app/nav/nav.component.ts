import {Component} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {};
  item: MenuItem[];

  constructor(public accountService: AccountService, private router: Router, private messageService: MessageService) {
    this.item = [
      {
        label: 'Users',
        icon:'pi pi-fw pi-user',
        items: [
          {label: 'Sign Out', icon: 'pi pi-sign-out', command: (() => this.logout())},
          {label: 'Edit Profile', icon:'pi pi-user-edit', url: "/member/edit"},
        ]
      },
    ];
  }


  login(){
    this.accountService.login(this.model).subscribe({
      next:_ => {
        this.router.navigateByUrl('/members');
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
