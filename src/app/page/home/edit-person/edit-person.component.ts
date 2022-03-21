import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    public service: PersonService) { }

    peopleList: any = [];
    dataCountries: any;
    formControl = new FormControl('', Validators.required);
    emailRegex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{4,}[.]{1}[a-zA-Z]{3,}';
    emails = new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]);

  ngOnInit(): void {
    this.service.GetAllCountries().subscribe((e) => (this.dataCountries = e));
    this.RefreshPeopleList();
  }

  RefreshPeopleList()
  {
    this.service.GetAllPeople().subscribe(data =>{
      this.peopleList = data;
    })
  }

  getErrorMessage(){
    return this.formControl.hasError('required') ? 'Field is required' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmEdit(): void {

    this.service.EditPerson(this.data).subscribe(
      (e) => {
        this.toastr.success("Updated Successfully"),this.dialogRef.close()
        this.RefreshPeopleList();
      },
      (er) => {
        this.toastr.error("Not Updated")
        this.RefreshPeopleList();
      }
    );
    this.RefreshPeopleList();
  }

}
