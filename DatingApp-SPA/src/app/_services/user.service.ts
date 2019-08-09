import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map, catchError } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams? , likesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'likers') {
      params = params.append('likers' , 'true');
    }

    if (likesParam === 'likees') {
      params = params.append('likees' , 'true');
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(userId: number, likeeId) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/like/' + likeeId, {});
  }
  // getMessages(userId, page?, itemsPerPage?, messageContainer?): Observable<PaginatedResult<Message[]>> {
  //     const params = new HttpParams();
  //     params.append('messageContainer', messageContainer);
  //     if ( page !== null && itemsPerPage !== null) {
  //       params.append('pageNumber', page);
  //       params.append('itemsPerPage', itemsPerPage);
  //     }
  //     const output: PaginatedResult<Message[]> =  new PaginatedResult<Message[]>();

  //     return this.http.get(this.baseUrl + 'users/' + userId + '/messages' , {observe: 'response', params})
  //     .pipe(
  //       map((response: any) => {
  //         output.result = response.body;
  //         if (response.headers.get('pagination') != null) {
  //             output.pagination = JSON.parse(response.headers.get('pagination'));
  //         }
  //         return output;
  //     })
  //     );
  // }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('messageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }


  getMessageThread(id: number, recipeientId:  number) {
    return this.http.get(this.baseUrl + 'users/' + id + '/messages/thread/' + recipeientId);
  }

  sendMessage(userId: number, message: any){
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages' , message);
  }

  deleteMessage(userId: number, id: number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id , {});
  }

  markAsReadMessage(userId: number, id: number){
    this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id + '/read' , {}).subscribe();
  }
}
