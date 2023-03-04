import {Component, OnInit} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {Pagination} from "../../_models/pagination";
import {UserParams} from "../../_models/userParams";
import {User} from "../../_models/user";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [
    {value: 'male', display: 'Males'},
    {value: 'female', display: 'Females'}
  ]
  stateOptions: any[];
  value1: string = "lastActive";

  constructor(private memberService: MemberService) {
    this.userParams = this.memberService.getUserParams();
    this.stateOptions = [{label: 'last Active', value: 'lastActive'}, {label: 'Newest Members', value: 'created'}];
  }

  ngOnInit() {
    this.loadMembers();
  }


  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  loadMembers() {
    if(this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  paginate(event: any) {
    if(this.userParams) {
      this.userParams.pageNumber = event.page + 1;
      this.userParams.pageSize = event.rows;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }
}
