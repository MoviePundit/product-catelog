import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/api/products.service';
import { product, Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[];
  unfilterProducts:Product[];
  filter:string='';
  addingNewProduct:boolean=false;
  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.retrieveAllProducts();
  }

  retrieveAllProducts(){
    this.service.getProducts().subscribe((data:Product[]) => {
      if(data){
        this.products = data;
        this.unfilterProducts = data;
      }
    })
  }

  retrieveAllProductsByCategory(category:string){
    
    this.service.getProductsByCategory(category).subscribe((data:Product[]) => {
      if(data){
        this.products = data;
        
      }
    })
    this.addingNewProduct=false;
  }

  updateProduct(updatedProduct:Product){
    let previous = this.products[updatedProduct.productId];
    this.products[updatedProduct.productId] = updatedProduct;
    this.products[updatedProduct.productId].edit = false;
    this.service.updateProductById(updatedProduct,updatedProduct.productId).subscribe((data:Product) => {
      if (data) {
        this.products[updatedProduct.productId] = data;
        this.unfilterProducts[updatedProduct.productId]=data;
      }
    },(error => {
      this.products[updatedProduct.productId] = previous;
      this.unfilterProducts[updatedProduct.productId]=previous;
      console.log(error)
    }))
  }

  addProductByTemplate(category,name,description,unit){
    

    if((category?.trim() == ("" || undefined) )
    || (name?.trim()  == ("" || undefined) )
    || (description?.trim()  == ("" || undefined) )
    || (unit  ==  undefined )){
      return;
    }

    let added : Product = new product(category,name,description,unit);

    this.service.createProduct(added).subscribe((data:Product) => {
      if (data) {
        this.addingNewProduct=!this.addingNewProduct;
        this.retrieveAllProducts();
      }
    },(error => {
      this.addingNewProduct=!this.addingNewProduct;
      console.log(error)
    }))
    
  }

  goHome(){
    this.addingNewProduct = false;
    this.retrieveAllProducts();
  }
}
