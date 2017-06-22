import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  posts: any;
  itemsPerPage: number;
  currentPage: number;
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

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private auth: AuthService,
    private postService: PostService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Profile - Interestink');
    this.itemsPerPage = 10;
    this.currentPage = 1;
    const sub = localStorage.getItem('sub');
    if (sub !== undefined) {
      this.postService.getPostsByUser(sub, this.itemsPerPage, this.currentPage).subscribe(
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

  isFirstPage() {
    if (this.currentPage === 1) {
      return true;
    } else {
      return false;
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
        title: this.postForm.value.title,
        tags: this.postForm.value.tags
      }
      console.log('newPost:', newPost);
      this.postService.addPost(newPost).subscribe(
        data => {
          if (data.success) {
            this.flashMessage.show('Post successfully created!', { cssClass: 'alert alert-success' });
          }
        },
        err => {
          console.error(err);
        }
      );
    }
  }

}
