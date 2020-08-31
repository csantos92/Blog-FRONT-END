import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public url;

  //File upload config
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "1",
    uploadAPI: {
      url: global.url + 'user/upload',
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    attachPinText: 'Sube tu avatar de usuario'
  };

  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Ajustes de usuario";
    //Create new user
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //Global URL
    this.url = global.url;
    
    //Get user data
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image,
    );
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {

        if (response && response.status) {
          this.status = 'success';

          //Update user data
          if (response.updated_user.name) {
            this.user.name = response.updated_user.name;
          }

          if (response.updated_user.surname) {
            this.user.surname = response.updated_user.surname;
          }

          if (response.updated_user.email) {
            this.user.email = response.updated_user.email;
          }

          if (response.updated_user.description) {
            this.user.description = response.updated_user.description;
          }

          if (response.updated_user.image) {
            this.user.image = response.updated_user.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  avatarUpload(img){
    //Save image data into the object
    let data = JSON.parse(img.response);
    this.user.image = data.image;
  }

}
