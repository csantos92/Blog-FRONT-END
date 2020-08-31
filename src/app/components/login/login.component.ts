import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    //This method logs out when the param sure is sent to the url
    this.logout();
  }

  onSubmit(form) {
    this._userService.login(this.user).subscribe(
      response => {

        //Get token
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          //Identified user object
          this._userService.login(this.user, true).subscribe(
            response => {
              this.identity = response;

              //Save data
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //Redirect
              this._router.navigate(['home']);
            },
            error => {
              this.status = 'error';
            }
          );

          //Clear form data
          form.reset();

        } else {
          this.status = 'error';
        }

      },
      error => {
        this.status = 'error';
      }
    );
  }

  logout() {
    //Get URL parameter
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        //Remove local strage user data
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redirect
        this._router.navigate(['home']);
      }
    })
  }

}
