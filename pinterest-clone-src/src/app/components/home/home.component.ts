import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any;
  myOptions: MasonryOptions = {
    transitionDuration: '0.8s',
    originLeft: true,
    resize: true,
    gutter: 10,
    fitWidth: true
  };
  imagesLoaded: any;

  constructor(
    private titleService: Title,
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Home - Interestink');
    this.postService.getPosts().subscribe(
      data => {
        if (data) {
          this.posts = data.posts;
          console.log('posts:', this.posts);
        }
      },
      err => {
        console.error(err);
      }
    )
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
