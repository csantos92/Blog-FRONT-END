import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'post-new',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status: string;
  public post: Post;
  public categories;
  public url;

  //File upload config
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "1",
    uploadAPI: {
      url: global.url + 'post/upload',
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
    attachPinText: 'Imagen para la entrada'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = "Editar entrada";
    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //Get global url
    this.url = global.url;
  }

  ngOnInit(): void {
    //Initialize methods and object
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getPost();
  }

  onSubmit(form) {
    //Ajax petition to update post data
    this._postService.update(this.token, this.post, this.post.id).subscribe(

      //Show status messages
      response => {
        if (response.status == 'success') {
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }

    )
  }

  getCategories() {
    //Ajax petition to get categories
    this._categoryService.getCategories().subscribe(

      response => {
        if (response.status == 'success') {
          //Save categories into a variable
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }

    )
  }

  imageUpload(img) {
    //Save image
    let data = JSON.parse(img.response);
    this.post.image = data.image;
  }

  getPost() {
    //Get id from URL
    this._route.params.subscribe(
      params => {
        let id = +params['id'];

        //Ajax petition to get a post by ID
        this._postService.getPost(id).subscribe(

          response => {
            if (response.status == 'success') {
              //Save post into the variable
              this.post = response.post;

              if (this.post.user_id != this.identity.sub) {
                //Redirect
                this._router.navigate(['/home']);
              }

            } else {
              //Redirect
              this._router.navigate(['/home']);
            }
          },
          error => {
            console.log(error);
            //Redirect
            this._router.navigate(['/home']);
          }
        );
      }
    );
  }

}
