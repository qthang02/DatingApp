import {Component, OnInit} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {Pagination} from "../../_models/pagination";
import {UserParams} from "../../_models/userParams";
import {User} from "../../_models/user";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [
    {value: 'male', display: 'Males'},
    {value: 'female', display: 'Females'}
  ]

  constructor(private memberService: MemberService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  ngOnInit() {
    this.loadMembers();
  }


  resetFilters() {
    if(this.user) {
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

  loadMembers() {
    if(!this.userParams) return;
    this.memberService.getMembers(this.userParams).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  paginate(event: any) {
    this.userParams!.pageNumber = event.page + 1;
    this.userParams!.pageSize = event.rows;
    this.loadMembers();
  }
}
