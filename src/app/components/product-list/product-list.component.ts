import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  
  
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Task deleted successfully!');
        this.loadProducts();
      });
    }
  }
  
  navigateToCreate(): void {
    this.router.navigate(['/create']);
    
  }
  navigateToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/view', id]);
  }
}

      

  