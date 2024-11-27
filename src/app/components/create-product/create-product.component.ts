import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product',
  standalone: false, 
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required], 
      description: ['', Validators.required], 
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }
  createProduct(): void {
    if (this.productForm.valid) {
      const newProduct: Product = { ...this.productForm.value, id: Date.now().toString() };
      this.productService.createProduct(newProduct).subscribe(() => {
        alert('Product created successfully!');
        this.router.navigate(['/']);
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}

