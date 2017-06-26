import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryOptions } from 'angular2-masonry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  posts: any;
  postForm: FormGroup;
  formErrors = {
    'imageUrl': '',
    'title': '',
    'tags': ''
  };
  validationMessages = {
    'imageUrl': {
      'required': 'A url is required.'
    }
  };
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
    private fb: FormBuilder,
    private auth: AuthService,
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Profile - Interestink');
    const sub = localStorage.getItem('sub');
    if (sub !== undefined) {
      this.postService.getPostsByUser(sub).subscribe(
        data => {
          this.posts = data.posts;
          console.log('posts:', this.posts);
        },
        err => {
          console.error(err);
        }
      )
    }
    this.buildForm();
  }

  buildForm(): void {
    this.postForm = this.fb.group({
      'imageUrl': ['', [ Validators.required ]],
      'title': '',
      'tags': ''
    });
    this.postForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  // onValueChanged function taken from the Angular Cookbook's Form Validation section
  // https://angular.io/docs/ts/latest/cookbook/form-validation.html
  onValueChanged(data?: any) {
    if (!this.postForm) { return; }
    const form = this.postForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message if any
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onPostFormSubmit() {
    // check if form is valid
    if (this.postForm.valid) {
      const sub = localStorage.getItem('sub');
      const nickname = localStorage.getItem('nickname');
      const newPost = {
        nickname,
        sub,
        imageUrl: this.postForm.value.imageUrl,
        title: this.postForm.value.title
      }
      if (this.postForm.value.tags.length > 0) {
        newPost['tags'] = this.postForm.value.tags;
      }
      console.log('newPost:', newPost);
      this.postService.addPost(newPost).subscribe(
        data => {
          if (data.success) {
            this.flashMessage.show('Post successfully created!', { cssClass: 'alert alert-success' });
            const currentUrl = this.router.url;
            const refreshUrl = currentUrl.indexOf('someRoute') > -1 ? '/someOtherRoute' : '/someRoute';
            this.router.navigateByUrl(refreshUrl).then(() => {
              this.router.navigateByUrl(currentUrl);
            });
          } else {
            this.flashMessage.show(data.msg + ' Please try again.', { cssClass: 'alert alert-failure' });
          }
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  onDeleteClick(post_id) {
    this.postService.deletePost(post_id).subscribe(
      data => {
        if (data.success) {
          this.flashMessage.show('Post deleted!', { cssClass: 'alert alert-failure' });
          const currentUrl = this.router.url;
          const refreshUrl = currentUrl.indexOf('someRoute') > -1 ? '/someOtherRoute' : '/someRoute';
          this.router.navigateByUrl(refreshUrl).then(() => {
            this.router.navigateByUrl(currentUrl);
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }

}
