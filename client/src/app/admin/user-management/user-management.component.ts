import {Component, OnInit} from '@angular/core';
import {User} from "../../_models/user";
import {AdminService} from "../../_services/admin.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {RolesModalComponent} from "../../modals/roles-modal/roles-modal.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ];

  constructor(private adminService: AdminService, private modalService: BsModalService) {}

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users,
    });
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
        initialState: {
            username: user.username,
            availableRoles: this.availableRoles,
            selectedRoles: [...user.roles]
        }
    }

    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if(!this.arrayEquals(selectedRoles!, user.roles)) {
          this.adminService.updateUserRoles(user.username, selectedRoles!).subscribe({
            next: roles => user.roles = roles
          });
        }
      }
    });
  }

  private arrayEquals(a: any[], b: any[]) {
    return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
  }

}
