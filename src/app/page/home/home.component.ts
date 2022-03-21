import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonModel } from 'src/app/models/personModel';
import { PersonService } from 'src/app/services/person.service';
import { CreatePersonComponent } from './create-person/create-person.component';
import { DeletePersonComponent } from './delete-person/delete-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: PersonService, private dialog: MatDialog) {}
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  
  Datasource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    'Name',
    'FamilyName',
    'Address',
    'Country',
    'Email',
    'Age',
    'Actions',
  ];
  ngOnInit(): void {
    this.GetAllPeople();
  }

  GetAllPeople() {
    this.service.GetAllPeople().subscribe(
      (e) => {
        this.Datasource = new MatTableDataSource(e);
        this.Datasource.paginator = this.paginator;
      },
      (er) => {
        console.log(er);
      }
    );
  }

  refreshList() {
    this.service.GetAllPeople().subscribe((data) => {
      this.Datasource = new MatTableDataSource(data)
      this.Datasource.paginator = this.paginator
    })
    this.ngOnInit();
  }

  createNewPerson() {
    const DialogRef = this.dialog.open(CreatePersonComponent, {
      data: { data: PersonModel },
    });
    DialogRef.afterOpened().subscribe((e) => {
      this.GetAllPeople()
      this.refreshList();
    });
    DialogRef.afterClosed().subscribe((result) => {
      this.refreshList();
    });
    this.refreshList();
  }

  startEdit(
    id: number,
    name: string,
    familyName: string,
    address: string,
    country: string,
    email: string,
    age: number,
    isHired: boolean
  ) {
    const dialogRef = this.dialog.open(EditPersonComponent, {
      data: {
        Id: id,
        firstName: name,
        familyName: familyName,
        address: address,
        country: country,
        email: email,
        age: age,
        isHired: isHired,
      },
    });
    dialogRef.afterOpened().subscribe((e) => {
      this.GetAllPeople();
      this.refreshList();
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshList();
    });
    this.refreshList();
  }

  deleteItem(
    id: number,
    name: string,
    familyName: string,
    address: string,
    country: string,
    email: string,
    age: number,
    isHired: boolean
  ) {
    const dialogRef = this.dialog.open(DeletePersonComponent, {
      data: {
        id: id,
        firstName: name,
        familyName: familyName,
        address: address,
        country: country,
        email: email,
        age: age,
        isHired: isHired
      },
    });
    dialogRef.afterOpened().subscribe((e) => {
      this.GetAllPeople()
      this.refreshList();
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshList();
    });
    this.refreshList();
  }
}
