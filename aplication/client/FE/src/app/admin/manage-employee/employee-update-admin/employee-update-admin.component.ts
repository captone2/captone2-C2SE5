import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeAccountService} from '../../../services/employee-account.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {compareValidator} from '../validateCustomEmployee/ConfirmedValidator';
import { AccountEmployeeDTO } from 'src/app/shared/model/dto/AccountEmployeeDTO';
import { Account } from 'src/app/shared/model/entity/Account';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-update-admin',
  templateUrl: './employee-update-admin.component.html',
  styleUrls: ['./employee-update-admin.component.css']
})
export class EmployeeUpdateAdminComponent implements OnInit {
  uploadedAvatar = null;
  employeeCreateForm: FormGroup;
  urlNoPoster = 'https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/wallpaper-for-facebook-profile-photo-e1440624505574.jpg?alt=media&token=986ad864-f3f1-4664-9e30-44b1bbd1f404'
  clickSubmit = false;
  idEmployee: number;
  employeeUpdateForm: FormGroup;
  filePath: string = null;
  inputImage: any = null;
  id: number;
  employee : Account;

  validationMessage = {

    fullname: [
      { type: 'required', message: 'First and last name cannot be left blank!' },
      { type: 'maxlength', message: 'First and last name up to 100 characters' },
      { type: 'pattern', message: 'First and last name do not contain numbers or special characters' }
    ],
    birthday: [
      { type: 'required', message: 'Date of birth cannot be blank!' },
    ],
    idCard: [
      { type: 'required', message: 'Please enter the CCCD number.' },
      { type: 'pattern', message: 'CCCD number consists of 12 digits.' },
    ],

    phone: [
      { type: 'required', message: 'Please enter the phone number.' },
      { type: 'pattern', message: 'Please enter the phone number in the correct format.' }
    ],

    email: [
      { type: 'required', message: 'Email cannot be blank!' },
      { type: 'email', message: 'Email invalidate' }
    ],



    password: [
      { type: 'required', message: 'Password can not be blank!' },
      { type: 'pattern', message: 'The password is not in the correct format.' }
    ],


    gender: [
      { type: 'required', message: 'Gender cannot be left blank!' }
    ],



    address: [
      { type: 'required', message: 'The address cannot be left blank!' },
      { type: 'maxlength', message: 'Addresses up to 50 characters.' },
      { type: 'pattern', message: 'Do not enter special characters. (!@#$%^&)' }
    ],
  };
  constructor(private form: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService,
    private http: HttpClient,
    private employeeService : EmployeeAccountService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) {

      this.employeeCreateForm = this.form.group({
        id: [''],
        fullname: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/),
        Validators.maxLength(100)]],
        birthday: ['', [Validators.required]],
        idCard: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
        address: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'),
        ]],
        email: ['', [Validators.email,
        Validators.required]],
        gender: [''],
        password: ['', [Validators.pattern('^(?=^.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#=?^&])[A-Za-z\\d@$!=%*#^?&]{8,20}$')]],
  
      });
  }

 


  ngOnInit(): void {
     this.getEmployee();
  }



  
  getEmployee() {
    const idAccount = parseInt(this.activatedRoute.snapshot.params['id']);
    this.employeeService.getEmployeeById(idAccount).subscribe(data => {
      this.employee = data;
      console.log(data)
      this.employeeCreateForm.controls.id.setValue(this.employee.id);
      this.employeeCreateForm.controls.fullname.setValue(this.employee.fullname);
      this.employeeCreateForm.controls.birthday.setValue(this.employee.birthday);
      this.employeeCreateForm.controls.idCard.setValue(this.employee.idCard);
      this.employeeCreateForm.controls.address.setValue(this.employee.address);
      this.employeeCreateForm.controls.phone.setValue(this.employee.phone);
      this.employeeCreateForm.controls.email.setValue(this.employee.email);
      this.employeeCreateForm.controls.gender.setValue(this.employee.gender);
    }, (error) => {
      this.toastService.error('Employee do not exist!', 'Error: ');
      this.router.navigate(['/admin/employee']);
    });
  }



  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    const type = event.target.files[0].type;
    console.log(type)
    if (type !== 'image/jpeg' && type !== 'image/png') {
      console.log("Lỗi")
      this.toastService.error('The requested file format is incorrect!', 'Error: ');
    } else {
      if (this.uploadedAvatar) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedAvatar);
        reader.onload = (e: any) => {
          this.urlNoPoster = e.target.result;
        };
      }
    }
  }

  onSubmitCreate() {
    console.log("Create")
    const employee = new AccountEmployeeDTO();
    employee.id = this.employeeCreateForm.value.id;
    employee.fullname = this.employeeCreateForm.value.fullname;
    employee.birthday = this.employeeCreateForm.value.birthday;
    employee.idCard = this.employeeCreateForm.value.idCard;
    employee.address = this.employeeCreateForm.value.address;
    employee.phone = this.employeeCreateForm.value.phone;
    employee.email = this.employeeCreateForm.value.email;
    employee.gender = this.employeeCreateForm.value.gender;
    employee.password = this.employeeCreateForm.value.password;
    



    // Upload img & download url
    if (this.uploadedAvatar !== null) {
      console.log("Có poster")
      console.log(employee)
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.storage.ref(avatarName);
      this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            employee.imageUrl = url;
            this.addEmployee(employee).subscribe(
              (data) => {
                this.toastService.success('Update successful!', 'Success: ');
                this.ngOnInit();
                this.router.navigateByUrl('/admin/employee')
              },
              (error: HttpErrorResponse) => {
                this.toastService.error('Update fail!', 'Error: ');
              }
            );
          });
        })
      ).subscribe();
    } else {
      console.log(employee)
      console.log("Không có poster")
      employee.imageUrl = this.urlNoPoster;
      this.addEmployee(employee).subscribe(
        (data) => {
          this.toastService.success('Update successful!', 'Success: ');
          this.router.navigateByUrl('/admin/employee')
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Update fail!', 'Error: ');
        }
      );
    }

  }


  addEmployee(employee: AccountEmployeeDTO): Observable<any> {
    const url = `http://localhost:8080/api/employee-account-edit`;
    return this.http.put(url, employee);
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }
}
