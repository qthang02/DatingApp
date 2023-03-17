import {Component, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {MemberService} from "../_services/member.service";
import {Pagination} from "../_models/pagination";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination | undefined;
  options: any[] = [];

  constructor(private memberService: MemberService) {
    this.options = [
      {label: 'Likers', value: 'liked'},
      {label: 'Likees', value: 'likedBy'}
    ]
  }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.members =  response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
