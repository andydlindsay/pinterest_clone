import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  authToken: any;
  sub: string;
  baseUrl: String = 'http://localhost:8080';
  // baseUrl: String = '';

  constructor(
    private http: Http
  ) { }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
    this.sub = localStorage.getItem('sub');
  }

  getPosts() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/api/public/posts', { headers })
      .map(res => res.json());
  }

  getPostById(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/api/public/posts/' + post_id, { headers })
      .map(res => res.json());
  }

  getPostsByUser(sub) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/api/public/posts/byuser/' + sub, { headers })
      .map(res => res.json());
  }

  addPost(newPost) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.baseUrl + '/api/private/posts/new', newPost, { headers })
      .map(res => res.json());
  }

  deletePost(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.delete(this.baseUrl + '/api/private/posts/' + post_id, { headers })
      .map(res => res.json());
  }

  favePost(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.baseUrl + '/api/private/fave/' + post_id, { sub: this.sub }, { headers })
      .map(res => res.json());
  }

  unfavePost(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.baseUrl + '/api/private/unfave/' + post_id, { sub: this.sub }, { headers })
      .map(res => res.json());
  }

}
