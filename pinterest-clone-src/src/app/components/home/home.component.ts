import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';
import { MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any;
  itemsPerPage: number;
  currentPage: number;
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
    private postService: PostService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Home - Interestink');
    this.itemsPerPage = 20;
    this.currentPage = 1;
    this.postService.getPosts(this.itemsPerPage, this.currentPage).subscribe(
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

}
