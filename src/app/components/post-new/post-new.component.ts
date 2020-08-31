import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status: string;
  public post: Post;
  public categories;

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
    private _postService: PostService,
  ) {
    this.page_title = "Crear nueva entrada";
    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //Initialize method and object
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
  }

  onSubmit(form) {
    //Petition that creates a new post
    this._postService.create(this.token, this.post).subscribe(

      response => {
        if (response.status == 'success') {
          //Save post into the variable
          this.post = response.post;
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
    //Ajax petition that gets all categories
    this._categoryService.getCategories().subscribe(

      response => {
        if (response.status == 'success') {
          //Save categiries into the variable
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }

    )
  }

  imageUpload(img) {
    //Save image info into the object
    let data = JSON.parse(img.response);
    this.post.image = data.image;
  }

}
