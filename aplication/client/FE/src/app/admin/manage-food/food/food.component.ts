import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeAccountService } from 'src/app/services/employee-account.service';
import { MovieService } from 'src/app/services/movie.service';
import { Food } from 'src/app/shared/model/entity/Food';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  titleModal: string;
  functionModal: string;
  createFood: FormGroup;
  foodList: Food[] = [];
  foodDelete: Food;
  pageSize: number = 5;
  currentPage: number = 1;
  foodUpdate: Food;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private form: FormBuilder, private movieService: MovieService, private employeeAccountService: EmployeeAccountService, private toastService: ToastrService,) {

  }
  validation_messages = {
    title: [
      { type: 'required', message: 'Please describe the content of the food.' },
      { type: 'pattern', message: 'Invalid food name, no special characters.' },
      { type: 'minlength', message: 'Food name must enter at least 3 characters.' },
      { type: 'maxlength', message: 'Food name can enter up to 100 characters.' }
    ],
    price: [
      { type: 'required', message: 'Please the price of the food. (VND)' },
      { type: 'pattern', message: 'Invalid food price input.' },
      { type: 'min', message: 'Minimum food price 5 digits.' },
      { type: 'max', message: 'Food prices up to 10 characters.' }
    ],
    description: [
      { type: 'required', message: 'Please describe the content of the food.' },
      { type: 'pattern', message: 'Enter invalid description, do not enter special characters.' },
      { type: 'minlength', message: 'The description of the food must enter at least 3 characters.' },
      { type: 'maxlength', message: 'The food description can be up to 200 characters.' }
    ],
  };
  ngOnInit(): void {

    this.movieService.getAllFood().subscribe((data) => {
      this.foodList = data;
      console.log(this.foodList);
    });
    this.createFood = this.form.group({
      id: [''],
      title: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$'),
      Validators.min(10000), Validators.max(9999999999)]],
      description: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\(|\)|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(3), Validators.maxLength(200)]],
    });
  }



  onSubmitCreate(method: any) {
    if(method == "Create") {
      this.employeeAccountService.createFood(this.createFood.value).subscribe((data) => {
        this.closeModal();
        this.toastService.success('Add new food successfully!', 'Success:');
        this.ngOnInit();
      }, (error) => {
        this.toastService.error('Add new food unsuccessfully!', 'Error:');
      });
    } else {
      if(method == "Update") {
        this.employeeAccountService.createFood(this.createFood.value).subscribe((data) => {
          this.closeModal();
          this.toastService.success('Update food successfully!', 'Success:');
          this.ngOnInit();
        }, (error) => {
          this.toastService.error('Update food unsuccessfully!', 'Error:');
        });
      }
    }
    
   
  }

  setFoodDelete(food: Food) {
    this.foodDelete = food;
  }
  deleteFood(id: number) {
    console.log(id)
    this.employeeAccountService.deleteFood(id).subscribe((data) => {
      this.toastService.success('Delete food successfully!', 'Success:');
      this.ngOnInit();
    }, (error) => {
      this.toastService.error('Delete food unsuccessfully!', 'Error:');
    });
  }

  changeTitleModalUpdate(food: any) {
    this.foodUpdate = food;
    this.createFood.controls.id.setValue(this.foodUpdate.id);
    this.createFood.controls.title.setValue(this.foodUpdate.title);
    this.createFood.controls.description.setValue(this.foodUpdate.description);
    this.createFood.controls.price.setValue(this.foodUpdate.price);
    this.titleModal = "Update food";
    this.functionModal = "Update";
  }

  changeTitleModalCreate() {
    this.createFood.reset();
    this.titleModal = "Create food";
    this.functionModal = "Create";
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
