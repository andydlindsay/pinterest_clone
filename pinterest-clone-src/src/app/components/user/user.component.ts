import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
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

}
