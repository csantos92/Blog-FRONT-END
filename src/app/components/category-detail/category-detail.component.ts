import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: any;
  public url: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPostsByCategory();
    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getPostsByCategory() {
    //Get category ID from URL
    this._route.params.subscribe(
      params => {
        let id = +params['id'];

        //Get category using the ID from URL
        this._categoryService.getCategory(id).subscribe(
          response => {
            //Petition response is OK
            if (response.status == 'success') {
              //Insert category (ID) into the variable this.category
              this.category = response.category;

              //Get posts of a category (ID)
              this._categoryService.getPosts(id).subscribe(

                response => {
                  if (response.status == 'success') {
                    //Insert posts of a category into the variable this.posts
                    this.posts = response.posts;
                  } else {
                    //Redirect
                    this._router.navigate(['/home']);
                  }
                },
                error => {
                  console.log(error);
                }

              )
            } else {
              //Redirect
              this._router.navigate(['/home']);
            }
          },
          //Petition response returns an error
          error => {
            console.log(error);
          }
        )
      }
    )
  }

  deletePost(id) {
    //Delete post that belongs to the identified user
    this._postService.delete(this.token, id).subscribe(

      response => {
        //Refresh the category page
        this.getPostsByCategory();
      },
      error => {
        console.log(error);
      }

    )
  }

}
