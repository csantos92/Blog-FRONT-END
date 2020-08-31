import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    //Get id from URL
    this._route.params.subscribe(
      params => {
        let id = +params['id'];

        //Petition to get a post by ID
        this._postService.getPost(id).subscribe(

          response => {
            if (response.status == 'success') {
              //Store post into the variable
              this.post = response.post;

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
