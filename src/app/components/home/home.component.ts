import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public url;
  public posts: Array<Post>;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = "Página de inicio";
    //Get global URL
    this.url = global.url;
    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    //Petition that gets all posts
    this._postService.getPosts().subscribe(

      response => {
        if (response.status == 'success') {
          //Save posts into the variable
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error);
      }

    )
  }

  deletePost(id) {
    //Delete post that belongs to the identified user
    this._postService.delete(this.token, id).subscribe(

      response => {
        //Refresh the posts page
        this.getPosts();
      },
      error => {
        console.log(error);
      }

    )
  }
}
