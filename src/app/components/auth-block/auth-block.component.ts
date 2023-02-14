import {Component, OnInit} from '@angular/core';
import {RegForm, User} from "../../shared/interfaces";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth-block',
  templateUrl: './auth-block.component.html',
  styleUrls: ['./auth-block.component.scss']
})
export class AuthBlockComponent implements OnInit {

  name: string | null;
  authFlag: boolean;
  showModal: boolean = false;
  modalContent: string;

  constructor(private auth: AuthService) {
  }

  register(data: RegForm) {
    this.auth.register(data).subscribe(() => {
      document.body.style.overflow = 'auto';
      this.showModal = false;
    });
  }

  login(user: User) {
    this.auth.login(user).subscribe(() => {
      this.authFlag = this.auth.isAuthenticated();
      document.body.style.overflow = 'auto';
      this.showModal = false;
      this.auth.menu$.next(['photo_doc', 'print', 'ceramics', 'tacho', 'about']);
    });
  }

  authorisation() {
    if (this.authFlag) {
      this.auth.logout().subscribe();
      this.auth.menu$.next(['photo_doc', 'print', 'tacho', 'about']);
      this.authFlag = false;
    } else {
      this.modalContent = 'login';
      this.showModal = true;
    }
  }

  ngOnInit(): void {
    this.authFlag = this.auth.isAuthenticated();

    if (this.authFlag) {
      // const expDate = localStorage.getItem('token_exp');
      // if (new Date().getTime() > parseInt(expDate!)) {
      //   this.auth.refreshToken().subscribe();
      // }
      this.name = localStorage.getItem('name');
      this.auth.refreshToken().subscribe();
    }
  }
}
