import {Component, Input} from '@angular/core';
import {MemberService} from "../../_services/member.service";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../_services/account.service";
import {User} from "../../_models/user";
import {Member} from "../../_models/member";
import {take} from "rxjs";
import {Photo} from "../../_models/photo";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  uploadedFiles: any[] = [];
  user: User | any;

  constructor(private accountService: AccountService, private http: HttpClient, private memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
  }

  uploadPhoto(event: any) {
    const file:File = event.files[0];
    const formData = new FormData();
    formData.set("file", file);

    this.memberService.uploadPhoto(formData).subscribe({
      next: _ => {
        this.memberService.getMember(this.user?.username).subscribe({
          next: member => this.member?.photos.push(member.photos[member.photos.length - 1])
        });
      }
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(x => x.id != photoId);
        }
      }
    })
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id == photo.id) p.isMain = true;
          })
        }
      }
    })
  }


}
