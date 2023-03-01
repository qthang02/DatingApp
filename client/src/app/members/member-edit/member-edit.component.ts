import {Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {MemberService} from "../../_services/member.service";
import {take} from "rxjs";
import {Member} from "../../_models/member";
import {User} from "../../_models/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit, OnChanges {
  @ViewChild('editForm') editFrom: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if(this.editFrom?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;

  constructor(private accountService: AccountService, private memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit() {
    this.loadMember();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  loadMember() {
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editFrom?.value).subscribe({
      next: _ => {
        this.editFrom?.reset(this.member);
      }
    })
  }
}
