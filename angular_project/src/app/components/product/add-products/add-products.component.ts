import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ProductAPIService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit{

productCategory!: any[];
  
  productForm: FormGroup;  
     
  constructor(private fb:FormBuilder, private apiService: ProductAPIService) {  
     
    this.productForm = this.fb.group({  
      productName: '',  
      longDesc: '',  
      shortDesc: '',  
      unitPrice: 0.0,  
      unitType: '',  
      unitWeight: 0.0,  
      totalQuantity: 0.0,  
      currentStock: 0.0,  
      productCategory: '',  
      productOptions: this.fb.array([]) ,  
    });  
  }  
  ngOnInit(): void {

this.apiService.getProductCategories().subscribe({
  next:res=>{
    this.productCategory = res;
    console.log('Categories---', this.productCategory);
    
  },
  error:console.log
  
})  }
    
  productOptions() : FormArray {  
    return this.productForm.get("productOptions") as FormArray  
  }  
     
  newProductOptions(): FormGroup {  
    return this.fb.group({  
      quantity: '',  
      color: '',  
      size: '',
    })  
  }  
     
  addProductOptions() {  
    this.productOptions().push(this.newProductOptions());  
  }  
     
  removeProductOptions(i:number) {  
    this.productOptions().removeAt(i);  
  }  
     
  url1: any;
  url2: any;
  url3: any;
  url4: any;

  file1!: File;
  file2!: File;
  file3!: File;
  file4!: File;

  message: any;
  // images: any[] = [""];
  imagePath: any;
  onFileChanged(event: any, index: number) {
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

      if(index==1){
        this.file1 = event.target.files.item(0);
        this.url1 = reader.result;
      }else if(index==2){
        this.file2 = event.target.files.item(0);
        this.url2 = reader.result;
      }
      else if(index==3){
        this.file3 = event.target.files.item(0);
        this.url3 = reader.result;
      }
      else if(index==4){
        this.file4 = event.target.files.item(0);
        this.url4 = reader.result;
      }
      else {
        this.file1 = event.target.files.item(0);
        this.url1 = reader.result;
      }
    }
}
pId!: any;
file!: File[];

onSubmit() {  
  console.log(this.productForm.value);  

  this.apiService.createProduct(this.productForm.value).subscribe({
    next:res=>{
      this.pId = res;
      console.log(this.pId); 
  
      const formData: FormData = new FormData();
      formData.append('file', this.file1);
      formData.append('file', this.file2);
      formData.append('file', this.file3);
      formData.append('file', this.file4);
      this.apiService.postProductImage(this.pId, formData).subscribe({
        next:res=>{
          alert("Data Saved..")
          this.ngOnInit();
        }
      })
    },
    error:console.log
  })
}  



}
