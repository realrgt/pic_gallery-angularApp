import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo';
import { tap, map, catchError } from 'rxjs/operators';
import { PhotoComment } from './photo-comment';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly API: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  listFromUser(userName: string) {
    return this.http.get<Photo[]>(this.API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString());

    return this.http.get<Photo[]>(this.API + '/' + userName + '/photos', {
      params
    });
  }

  upload(file: File, description: string, allowComments: boolean) {

    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');

    return this.http.post(this.API + '/photos/upload', formData, { observe: 'events', reportProgress: true } );
  }

  findById(id: number) {
    // return this.http.get<Photo>(this.API + '/photos/' + id);
    return this.http.get<Photo>(`${this.API}/photos/${id}`)
      .pipe(tap(console.log));
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(this.API + '/photos/' + photoId + '/comments');
  }

  addComments(photoId: number, commentText: string) {
    return this.http.post(this.API + '/photos/' + photoId + '/comments', { commentText });
  }

  removePhoto(photoId: number) {
    return this.http.delete(`${this.API}/photos/${photoId}`);
  }

  like(photoId: number) {
    return this.http.post(
        this.API + '/photos/' + photoId + '/like', {}, { observe: 'response'}
    )
    .pipe(map(res => true))
    .pipe(catchError(err => {
        return err.status == '304' ? of(false) : throwError(err);
    }));
}

}
