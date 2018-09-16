// Angular module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Material module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Other module
import { NgxPaginationModule } from 'ngx-pagination';

// App Module
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { BrandService } from './services/brand.service';
import { CategorieService } from './services/categorie.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [ProductService, BrandService, CategorieService],
  bootstrap: [AppComponent],
  entryComponents: [ProductDialogComponent]
})
export class AppModule {}
