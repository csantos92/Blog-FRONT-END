import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'blog-angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.userData();
    this.url = global.url;
  }

  ngOnInit(){
    this.getCategories();
  }

  ngDoCheck(){
    this.userData();
  }

  userData(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(

      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
        }
      }
      
    )
  }
}

