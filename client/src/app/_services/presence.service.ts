import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {User} from "../_models/user";
import {BehaviorSubject, take} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toast: ToastrService, private router: Router) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: userNames => this.onlineUsersSource.next([...userNames, username])
      })
    });

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: userNames => this.onlineUsersSource.next(userNames.filter(x => x !== username))
      })
    });

    this.hubConnection.on('GetOnlineUsers', username => {
      this.onlineUsersSource.next(username);
    });

    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      this.toast.info(knownAs + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe({
          next: () => this.router.navigateByUrl('/members/' + username + '?tab=Messages')
        });
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch(error => console.log(error));
  }
}
