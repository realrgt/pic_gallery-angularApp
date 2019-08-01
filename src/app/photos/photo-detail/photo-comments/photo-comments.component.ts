import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;
  commentForm: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.comments$ = this.photoService.getComments(this.photoId);

    this.commentForm = this.formBuilder.group({
      comment: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(300)])
      ]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.photoService.addComments(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(tap(() => {
        this.commentForm.reset();
      }));
  }

}
