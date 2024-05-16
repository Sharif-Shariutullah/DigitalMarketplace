import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-image',
  templateUrl: './add-product-image.component.html',
  styleUrls: ['./add-product-image.component.scss']
})
export class AddProductImageComponent {

  title = 'Angular Image Upload Example';
  successMessage: string = '';
  images: string[] = [];

 

  uploadForm!: FormGroup ;
  constructor(private http: HttpClient) {
    this.initForm();
  }
  initForm() {
    this.uploadForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
    });
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          let binary = "";
          let bytes = new Uint8Array(event.target.result);
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          let base64String = btoa(binary);
          let imageUrl = 'data:image/jpeg;base64,' + base64String;
          this.images.push(imageUrl);
          this.uploadForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }



  save() {
    this.http
      .post('http://localhost:8000/upload.php', this.uploadForm.value)
      .subscribe(() => {
        this.successMessage = 'Uploaded Successfully';
      });
  }








  url: any;
  message: any;

  imagePath: any;
  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.url = reader.result;
    }
}

}

