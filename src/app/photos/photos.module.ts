import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotosListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';


@NgModule({
  declarations: [PhotoDetailComponent],
  imports: [
    CommonModule,
    PhotoModule,
    PhotoFormModule,
    PhotosListModule
  ],
})
export class PhotosModule { }
