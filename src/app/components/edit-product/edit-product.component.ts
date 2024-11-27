import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product.model';
import { error } from 'console';
@Component({
  selector: 'app-edit-product',
  standalone: false,
  
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productForm: FormGroup;
  productId: number;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]]
    });
    this.productId = 0;
  
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  } 
   

      
  // loadProductDetails(): void {
  //   this.productService.getProductById(this.productId).subscribe(
  //     (product) => {
  //       console.log('Fetched Product:', product);
  //       if (product) {
  //         this.productForm.patchValue(product);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching product:', error);
  //       this.router.navigate(['/']);
  //     }
  //   );
  // }


  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = { ...this.productForm.value, id: this.productId };
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(()=>{
        alert('Product updated successfully!');
        this.router.navigate(['/']);
      });
    }
  }
  goToProducts(): void {
    this.router.navigate(['/']);
  }
}
        
      

  
