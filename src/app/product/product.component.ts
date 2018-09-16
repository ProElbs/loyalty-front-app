// Angular module
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';

// Services
import { ProductService } from '../services/product.service';

// Other
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

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

  /**
   * Constructor of the class
   * @param _productService Product service
   * @param fb Formbuilder of Angular
   * @param dialog Material dialog
   */
  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    public dialog: MatDialog
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

  /**
   * Function to load product regarding page and/or search option
   * @param {number} page
   * @param {string} search
   */
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

  /**
   * Function to open a dialog displaying details on a product
   * @param name
   * @param description
   * @param brandId
   * @param image
   * @param id
   * @param categoriesId
   */
  openDetailProduct(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        product: product
      },
      autoFocus: false
    });

    // Disable click aside to close dialog and ESC from keyboard
    dialogRef.disableClose = true;

    // Event when dialog is closed, reload datas
    dialogRef.afterClosed().subscribe(success => {
      if (success === 'refresh') {
        this.getPage(this.page, this.searchForm.get('research').value);
      }
    });
  }
}
