import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService
      .upload(this.file, description, allowComments)
      .subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event.type == HttpEventType.Response) {  // or event instanceof HttpResponse
          // this.alertService.success('Upload complete', true);
          this.router.navigate(['/user', this.userService.getUserName()]);
        }
      },
      err => {
        console.log(err);
        // this.alertService.danger('Upload error!');
        this.router.navigate(['/user', this.userService.getUserName()]);
      });

  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();  // see FileReader documentation
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

  cancelUpload() {
  }

}
