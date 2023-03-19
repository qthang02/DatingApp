import {Component, Input, ViewChild} from '@angular/core';
import {Message} from "../../_models/Message";
import {MessageService} from "../../_services/message.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent{
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() messages: Message[] = [];
  @Input() username?: string;
  messageContent: string = '';

  constructor(public messageService: MessageService) {}

  sentMessage() {
    if(!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: (message: Message) => {
        this.messages.push(message);
        this.messageForm?.reset();
      }
    })
  }
}
