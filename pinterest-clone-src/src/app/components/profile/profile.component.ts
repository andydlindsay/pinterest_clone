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

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private auth: AuthService,
    private postService: PostService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Profile - Interestink');
    this.buildForm();
  }

  buildForm(): void {

  }

}
