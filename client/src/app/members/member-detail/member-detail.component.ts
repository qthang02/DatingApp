import {Component, OnInit, ViewChild} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {ActivatedRoute} from "@angular/router";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
import {MessageService} from "../../_services/message.service";
import {Message} from "../../_models/Message";
import {PresenceService} from "../../_services/presence.service";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MemberService, private route: ActivatedRoute,
              private messageService: MessageService, public presenceService: PresenceService) {}

  ngOnInit() {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    });

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    });

    this.loadMessages();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member
      }
    });
  }

  selectTab(header: string) {
    if(this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === header)!.active = true;
    }
  }

  loadMessages() {
    if (this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
        this.messages = messages;
      })
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if(this.activeTab?.heading === 'Messages' && this.member) {
      this.loadMember();
    }
  }
}
