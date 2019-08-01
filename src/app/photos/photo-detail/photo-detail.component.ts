import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  photo$: Observable<Photo>;
  photoId: number;

  heartClicked = false;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
  }

  remove() {
    this.photoService.removePhoto(this.photoId).subscribe(() => {
      confirm('Sure you wanna delete?');
      this.router.navigate(['']);
    });
  }

  like(photo: Photo) {
    this.heartClicked = true;
    this.photoService.like(photo.id).subscribe(liked => {
      if (liked) {
        this.photo$ = this.photoService.findById(photo.id);
      }
    });
  }
}
