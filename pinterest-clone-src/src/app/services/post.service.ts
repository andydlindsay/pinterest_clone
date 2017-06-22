import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  authToken: any;
  baseUrl: String = 'http://localhost:8080';
  // baseUrl: String = '';

  constructor(
    private http: Http
  ) { }

  loadToken() {
    this.authToken = localStorage.getItem('access_token');
  }

  getPosts(itemsPerPage, currentPage) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const queryString = '?itemsperpage=' + itemsPerPage + '&currentpage=' + currentPage;
    return this.http.get(this.baseUrl + '/api/public/posts' + queryString, { headers })
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
    headers.append('Authorization', this.authToken);
    return this.http.post(this.baseUrl + '/api/private/posts/new', { headers })
      .map(res => res.json());
  }

  deletePost(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete(this.baseUrl + '/api/private/posts/' + post_id, { headers })
      .map(res => res.json());
  }

  favePost(post_id, sub) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(this.baseUrl + '/api/private/fave/' + post_id, { sub }, { headers })
      .map(res => res.json());
  }

}
