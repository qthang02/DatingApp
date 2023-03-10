import {Component, OnInit} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{
  member: Member | undefined;
  //images: [{}];
  constructor(private memberService: MemberService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member
        //this.images = member.photos
      }
    });
  }
}
