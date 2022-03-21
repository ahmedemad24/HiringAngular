import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from 'src/app/services/person.service';
import { ToastrService } from 'ngx-toastr';
import { PersonModel } from 'src/app/models/personModel';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
})
export class CreatePersonComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreatePersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public service: PersonService,
  ) {}

  ngOnInit(): void {
    this.service.GetAllCountries().subscribe((e) => (this.dataCountries = e));
    this.RefreshPeopleList();
  }

  emailRegex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{4,}[.]{1}[a-zA-Z]{3,}';

  dataCountries: any;
  peopleList: any = [];
  formControl = new FormControl('', Validators.required);
  name = new FormControl('', [Validators.required, Validators.minLength(5)]);
  familyName =  new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required, Validators.minLength(10)]);
  countryOfOrigin = new FormControl('', [Validators.required]);
  emails = new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]);
  age = new FormControl('', [Validators.required, Validators.min(20),Validators.max(60)]);


  submit() {
    // emppty stuff
  }

  RefreshPeopleList()
  {
    this.service.GetAllPeople().subscribe(data =>{
      this.peopleList = data;
    })
  }

   getEmailMessage() {
    if (this.emails.hasError('required')) {
      return 'You must enter a value'
    }
    return this.emails.hasError('email') ? 'Not a valid email !' : '';
  }

  getErrorMessage(){
    return this.formControl.hasError('required') ? 'Field is required' : '';
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    this.service.InsertPerson(this.data).subscribe(
      (e) => {
        this.toastr.success('Created Success'), this.dialogRef.close()
      },
      (er) => {
        this.toastr.error('Faild On Create')
      }
      )
      this.RefreshPeopleList();
    }
}
