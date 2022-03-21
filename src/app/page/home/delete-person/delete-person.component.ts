import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss'],
})
export class DeletePersonComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletePersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public service: PersonService
  ) {}

  peopleList: any = [];
  peopleData: any;

  ngOnInit(): void {
    this.service.GetById(this.data.id).subscribe((e) => (this.peopleData = e));
    this.RefreshPeopleList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  RefreshPeopleList() {
    this.service.GetAllPeople().subscribe((data) => {
      this.peopleList = data;
    });
  }

  confirmDelete(): void {
    this.service.DeletePerson(this.data.id).subscribe(
      (e) => {
        this.data = e;
        this.dialogRef.close();
        this.toastr.success('Deleted Success'), this.dialogRef.close();
        this.RefreshPeopleList();
      },
      (er) => {
        this.toastr.error('Not Deleted');
        this.RefreshPeopleList();
      }
    );
    this.dialogRef.close();
    this.RefreshPeopleList();
  }
}
