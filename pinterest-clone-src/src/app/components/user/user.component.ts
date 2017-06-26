import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  posts: any;
  myOptions: MasonryOptions = {
    transitionDuration: '0.8s',
    originLeft: true,
    resize: true,
    gutter: 10,
    fitWidth: true
  };
  imagesLoaded: any;
  nickname: string;

  constructor(
    private titleService: Title,
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe( params => {
        const user_sub = params['id'];
        this.postService.getPostsByUser(user_sub).subscribe(
          data => {
            if (data) {
              this.posts = data.posts;
              console.log('user posts:', this.posts);
              this.nickname = this.posts[0].nickname;
            }
          },
          err => {
            console.error(err);
          }
        );
      });
  }

  favePost(post_id, index) {
    this.postService.favePost(post_id).subscribe(
      data => {
        if (data.success) {
          const sub = localStorage.getItem('sub');
          this.posts[index].faves.push(sub);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  unfavePost(post_id, index) {
    this.postService.unfavePost(post_id).subscribe(
      data => {
        if (data.success) {
          const sub = localStorage.getItem('sub');
          const faveIndex = this.posts[index].faves.indexOf(sub);
          this.posts[index].faves.splice(faveIndex, 1);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  isFave(index) {
    if (this.authService.isAuthenticated()) {
      const sub = localStorage.getItem('sub');
      if (this.posts[index].faves.indexOf(sub) === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

}
