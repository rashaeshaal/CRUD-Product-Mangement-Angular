import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-view-product',
  standalone: false,
  
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {
  productId: number | undefined;
  product: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router)
    {}
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.productId = id ? Number(id) : undefined; 
    
      if (this.productId) {
        this.loadProduct(this.productId);
      } else {
        this.router.navigate(['/']);
      }
    }
    
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
       next: (product) => {
        this.product = product;
      },
      error: () => {
        alert('Product not found!');
        this.router.navigate(['/']); 
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/']); 

  }
}
