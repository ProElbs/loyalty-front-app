// Angular module
import { Component, OnInit, OnDestroy } from '@angular/core';

// Services
import { ProductService } from '../services/product.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  // Request currently sending
  private productPendingRequest: any;

  // General component variables
  public error = false; // Error loading
  public loadingData: boolean; // Page is laoding to receive data
  public smallLoader: boolean; // Data are loading
  public page: number; // Current page
  public searchSubscriber: Subscription;

  // Products variables
  public productsData: any;
  public totalProduct: number; // total product in Database
  public searchForm: FormGroup; // Form to edit metier

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder
  ) {}

  /**
   * Initialization of component, loader, error, referentiel and agent informations
   */
  ngOnInit() {
    if (this.productPendingRequest) {
      this.productPendingRequest.unsubscribe();
    }
    this.searchForm = this.fb.group({
      research: new FormControl('')
    });

    this.getPage(1, undefined);

    // Debounce for search completion to reduce API call
    this.searchSubscriber = this.searchForm
      .get('research')
      .valueChanges.debounceTime(600)
      .subscribe(success => {
        this.getPage(1, this.searchForm.get('research').value);
      });
  }

  /**
   * Destroy of component unsubscribe http request
   */
  ngOnDestroy() {
    if (this.productPendingRequest) {
      this.productPendingRequest.unsubscribe();
    }
    this.searchSubscriber.unsubscribe();
  }

  getPage(page: number, search) {
    this.loadingData = true;
    this.productPendingRequest = this._productService
      .getProducts(page, search)
      .subscribe(
        // Success
        data => {
          this.productsData = data.body;
          this.page = page;
          this.totalProduct = data.headers.get('X-Pagination-Count');
          this.loadingData = false;
          // Error
        },
        error => {
          this.loadingData = false;
          this.error = true;
        }
      );
  }
}
