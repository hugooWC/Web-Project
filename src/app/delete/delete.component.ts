import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { BasketballRecord } from '../basketball.model';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  deleteForm: FormGroup;
  http: HttpClient;
  serverData!: Object | null;
  url!: string;
  serverDataArr!: any;
  @Input() basketRecord!:BasketballRecord;

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;

    this.deleteForm = fb.group(
      {
        'bkId': ['', Validators.required ],
        'District': [],
        'Name': [],
        'Address': [],
        'Gihs': [],
        'Court': [],
        'AF': [],
        'Openhrs': [],
        'Phone': [],
        'Remarks': [],
        'Longitude': [],
        'Latitude': []
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("Delete ID: " + this.basketRecord.bkId);
    console.log("Delete District: " + this.basketRecord.District_en);
    console.log("Delete Name: " + this.basketRecord.Name_en);
    console.log("Delete Address: " + this.basketRecord.Address_en);
    console.log("Delete GIHS: " + this.basketRecord.GIHS);
    console.log("Delete Court: " + this.basketRecord.Court_no_en);
    console.log("Delete Ancillary facilities: " + this.basketRecord.Ancillary_facilities_en);
    console.log("Delete Opening hours: " + this.basketRecord.Opening_hours_en);
    console.log("Delete Phone: " + this.basketRecord.Phone);
    console.log("Delete Remarks: " + this.basketRecord.Remarks_en);
    console.log("Delete Longitude: " + this.basketRecord.Longitude);
    console.log("Delete Latitude: " + this.basketRecord.Latitude);

    this.deleteForm.controls['bkId'].setValue(this.basketRecord.bkId);
    this.deleteForm.controls['District'].setValue(this.basketRecord.District_en);
    this.deleteForm.controls['Name'].setValue(this.basketRecord.Name_en);
    this.deleteForm.controls['Address'].setValue(this.basketRecord.Address_en);
    this.deleteForm.controls['Gihs'].setValue(this.basketRecord.GIHS);
    this.deleteForm.controls['Court'].setValue(this.basketRecord.Court_no_en);
    this.deleteForm.controls['AF'].setValue(this.basketRecord.Ancillary_facilities_en);
    this.deleteForm.controls['Openhrs'].setValue(this.basketRecord.Opening_hours_en);
    this.deleteForm.controls['Phone'].setValue(this.basketRecord.Phone);
    this.deleteForm.controls['Remarks'].setValue(this.basketRecord.Remarks_en);
    this.deleteForm.controls['Longitude'].setValue(this.basketRecord.Longitude);
    this.deleteForm.controls['Latitude'].setValue(this.basketRecord.Latitude);
  }

  onSubmit(formValue: any): void {
    console.log("Delete: " + formValue['bkId']);
    this.url = "http://localhost/atwdcw/index.php/search/delete/" + formValue['bkId'];
    console.log(this.url);
    this.http.delete(this.url).subscribe(
      res => {
        console.log(res);
          this.serverData = res;
          this.serverDataArr = JSON.parse(JSON.stringify(res));
      },
      res => {
        console.log("Server error: " + res);
      }
    );
    setTimeout(function() {
      document.getElementById("closeButton")?.click();
  }, 4000);
  }
  @Output() cancelDeleteEvent = new EventEmitter();

  cancelButtonHandler() {
  this.cancelDeleteEvent.emit();
  }
}
