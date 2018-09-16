// Angular module
import { Component, OnInit, OnDestroy } from '@angular/core';

// Services
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  // Request currently sending
  private productPendingRequest: any;

  // General component variables
  public error: boolean; // Error loading
  public loadingData: boolean; // Page is laoding to receive data
  public page = 1;

  // Products variables
  public productsData: any;

  constructor(private _productService: ProductService) {}

  /**
   * Initialization of component, loader, error, referentiel and agent informations
   */
  ngOnInit() {
    this.error = false;
    this.loadingData = true;

    if (this.productPendingRequest) {
      this.productPendingRequest.unsubscribe();
    }

    this.productPendingRequest = this._productService.getProducts().subscribe(
      // Success
      data => {
        this.productsData = data;
        console.log(data);
        this.loadingData = false;
        // Error
      },
      error => {
        this.loadingData = false;
        this.error = true;
      }
    );
  }

  /**
   * Destroy of component unsubscribe http request
   */
  ngOnDestroy() {
    if (this.productPendingRequest) {
      this.productPendingRequest.unsubscribe();
    }
  }
}
