import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status: string;
  public category: Category;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = "Crear nueva categoría";

    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    //Create category
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    //Create category by making a petition to the API
    this._categoryService.create(this.token, this.category).subscribe(
      
      response => {
        if (response.status == 'success') {
          //If response is OK the category and the status message is saved into variables
          this.category = response.category;
          this.status = response.status;
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }

    )
  }

}
