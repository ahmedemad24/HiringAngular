import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/personModel';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(public http : HttpClient) { }
  baseUrl = 'https://localhost:44398/api/Person';
  countryUrl = 'https://restcountries.com/v3.1/all';

  GetAllPeople(){
    return this.http.get<PersonModel[]>(this.baseUrl + '/' + 'GetAll');
  }

  GetById(id: number){
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  InsertPerson(formModel: any){
    return this.http.post(this.baseUrl, formModel);
  }

  EditPerson(edit: any){
    return this.http.put(this.baseUrl + '/' + edit.Id, edit);
  }

  DeletePerson(id: number){
    return this.http.delete(this.baseUrl + '/' + id);
  }

  GetAllCountries(){
    return this.http.get<any[]>(this.countryUrl);
  }
}
