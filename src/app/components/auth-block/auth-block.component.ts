import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegForm, User} from "../../shared/interfaces";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import {Subs} from '../../utilities/subs';

@Component({
  selector: 'app-auth-block',
  templateUrl: './auth-block.component.html',
  styleUrls: ['./auth-block.component.scss']
})
export class AuthBlockComponent implements OnInit, OnDestroy {

  name: string | null;
  authFlag: boolean;
  showModal: boolean = false;
  modalContent: string;

  constructor(private auth: AuthService, private router: Router, private subs: Subs) {
  }

  register(data: RegForm) {
    this.subs.add = this.auth.register(data).subscribe(() => {
      document.body.style.overflow = 'auto';
      this.showModal = false;
    });

  }

  login(user: User) {
    this.subs.add = this.auth.login(user).subscribe(() => {
      this.login_process();
    });
  }

  login_process() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
    this.authFlag = this.auth.isAuthenticated();
    this.name = localStorage.getItem('name');
  }

  click_button_1() {
    if (this.authFlag) {
      this.subs.add = this.auth.logout().subscribe();
      this.authFlag = false;
    } else {
      this.modalContent = 'login';
      this.showModal = true;
    }
  }

  click_button_2() {
    if (this.authFlag) {
      this.router.navigate(['/orders']).then();
    } else {
      this.modalContent = 'registration';
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
      // this.auth.refreshToken().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
