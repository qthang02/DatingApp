import {Component, Input} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  constructor(private memberService: MemberService, private messageService: MessageService) { }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'You have liked ' + member.knownAs})
      }
    })
  }
}
