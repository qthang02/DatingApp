import {Component, OnInit} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {Pagination} from "../../_models/pagination";
import {UserParams} from "../../_models/userParams";
import {PageEvent} from "@angular/material/paginator";

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



  constructor(private memberService: MemberService) {
    this.userParams = this.memberService.getUserParams();
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
            console.log(this.userParams?.orderBy);
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  handlePageEvent(event: PageEvent) {
    this.userParams!.pageNumber = event.pageIndex + 1;
    this.userParams!.pageSize = event.pageSize;
    this.memberService.setUserParams(this.userParams!);
    this.loadMembers();
  }
}
