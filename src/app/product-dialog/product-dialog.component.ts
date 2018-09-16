// Angular import
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

// Material import
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

// Service import
import { ProductService } from '../services/product.service';
import { CategorieService } from '../services/categorie.service';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  public productForm: FormGroup; // Form to edit a product

  // General variables
  public productEdit;
  public loading: boolean;

  // Referentiel variables
  public referentielBrands;
  public referentielCategories;

  /**
   * Constructor of the class
   * @param _productService
   * @param _categorieService
   * @param _brandService
   * @param dialogRef
   * @param fb
   * @param snackBar
   * @param data
   */
  constructor(
    private _productService: ProductService,
    private _categorieService: CategorieService,
    private _brandService: BrandService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productEdit = this.data.product;
  }

  /**
   * Initialization of component, referentiels and form are loaded
   */
  ngOnInit() {
    // Initialization of Categorie referentiel
    this._categorieService.getCategories().subscribe(data => {
      this.referentielCategories = data;
    });

    // Initialization of Brand referentiel
    this._brandService.getBrands().subscribe(data => {
      this.referentielBrands = data;
    });

    this.productForm = this.fb.group({
      name: new FormControl('', [
        Validators.maxLength(20),
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.maxLength(100),
        Validators.required
      ]),
      brand: new FormControl('', Validators.required)
    });

    // Set values only if we are in edit mode
    if (this.productEdit) {
      this.productForm.setValue({
        name: this.data.product.name,
        description: this.data.product.description,
        brand: this.data.product.brand.id
      });
    }
  }

  /**
   * Function to close dialog
   * @param result refresh or not
   */
  closeDialog(result?) {
    this.dialogRef.close(result);
  }

  /**
   * Modify a product or add it
   * @param {any} post data about the product
   */
  modifyProduct(post: any, validForm: boolean) {
    if (validForm) {
      this.loading = true;
      // Edit product
      if (this.productEdit) {
        this._productService.editProduct(this.productEdit.id, post).subscribe(
          // Success
          success => {
            this.loading = false;
            this.snackBar.open('The product has been modified', 'Ok', {
              duration: 3000
            });
            this.closeDialog('refresh');
          },
          // Error
          error => {
            if (error.code === 400) {
              this.dialogRef.close();
              this.snackBar.open('An error occured', 'Ok', {
                duration: 3000
              });
            }
            if (error.code === 404) {
              this.dialogRef.close();
              this.snackBar.open('Product not found', 'Ok', {
                duration: 3000
              });
            }
            this.loading = false;
          }
        );
        // Add product
      } else {
        this._productService.addProduct(post).subscribe(
          // Success
          success => {
            this.loading = false;
            this.snackBar.open('The product has been modified', 'Ok', {
              duration: 3000
            });
            this.closeDialog('refresh');
          },
          // Error
          error => {
            if (error.code === 400) {
              this.dialogRef.close();
              this.snackBar.open('An error occured', 'Ok', {
                duration: 3000
              });
            }
            this.loading = false;
          }
        );
      }
    } else {
      this.snackBar.open('Required field are missing', 'Ok', {
        duration: 3000
      });
    }
  }
}
