import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {

  public identity;
  public token;
  public user: User;
  public url;
  public posts: Array<Post>;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    //Get global URL
    this.url = global.url;
    //Get identified user
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getProfile();
  }

  //Gets user ID
  getProfile(){
    this._route.params.subscribe(
      params => {
        let userId = +params['id'];
        this.getUser(userId);
        this.getPosts(userId);
      });
  }

  getUser(userId){
    //Get user by ID
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getPosts(userId){
    //Get posts by user's ID
    this._userService.getPosts(userId).subscribe(

      response => {
        if(response.status == 'success'){
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error);
      }

    )
  }

  deletePost(id){
    //Petition to delete a post made by the user
    this._postService.delete(this.token, id).subscribe(
      
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }

    )
  }

}
