import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BasketballRecord } from '../basketball.model';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  http: HttpClient;
  serverData!: Object | null;
  url!: string;
  serverDataArr!: any;
  @Input() basketRecord!:BasketballRecord;

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.updateForm = fb.group(
      {
        'bkId': ['', Validators.required ],
        'District_en': ['', Validators.required ],
        'Name_en': ['', Validators.required ],
        'Address_en': ['', Validators.required ],
        'GIHS': ['', Validators.required ],
        'Court_no_en': ['', Validators.required ],
        'Ancillary_facilities_en': ['', Validators.required ],
        'Opening_hours_en': ['', Validators.required ],
        'Phone': ['', Validators.required ],
        'Remarks_en': ['', Validators.required ],
        'Longitude': ['', Validators.required ],
        'Latitude': ['', Validators.required ]
      }
    );
   }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("Update ID: " + this.basketRecord.bkId);
    console.log("Update District: " + this.basketRecord.District_en);
    console.log("Update Name: " + this.basketRecord.Name_en);
    console.log("Update Address: " + this.basketRecord.Address_en);
    console.log("Update GIHS: " + this.basketRecord.GIHS);
    console.log("Update Court: " + this.basketRecord.Court_no_en);
    console.log("Update Ancillary facilities: " + this.basketRecord.Ancillary_facilities_en);
    console.log("Update Opening hours: " + this.basketRecord.Opening_hours_en);
    console.log("Update Phone: " + this.basketRecord.Phone);
    console.log("Update Remarks: " + this.basketRecord.Remarks_en);
    console.log("Update Longitude: " + this.basketRecord.Longitude);
    console.log("Update Latitude: " + this.basketRecord.Latitude);

    this.updateForm.controls['bkId'].setValue(this.basketRecord.bkId);
    this.updateForm.controls['District_en'].setValue(this.basketRecord.District_en);
    this.updateForm.controls['Name_en'].setValue(this.basketRecord.Name_en);
    this.updateForm.controls['Address_en'].setValue(this.basketRecord.Address_en);
    this.updateForm.controls['GIHS'].setValue(this.basketRecord.GIHS);
    this.updateForm.controls['Court_no_en'].setValue(this.basketRecord.Court_no_en);
    this.updateForm.controls['Ancillary_facilities_en'].setValue(this.basketRecord.Ancillary_facilities_en);
    this.updateForm.controls['Opening_hours_en'].setValue(this.basketRecord.Opening_hours_en);
    this.updateForm.controls['Phone'].setValue(this.basketRecord.Phone);
    this.updateForm.controls['Remarks_en'].setValue(this.basketRecord.Remarks_en);
    this.updateForm.controls['Longitude'].setValue(this.basketRecord.Longitude);
    this.updateForm.controls['Latitude'].setValue(this.basketRecord.Latitude);
  }

  onSubmit(formValue: any): void {
    this.url = "http://localhost/atwdcw/index.php/search/update/" +formValue['bkId'] + "/" + formValue['District_en'] + "/" + formValue['Name_en'] + "/" + formValue['Address_en'] + "/"
    + formValue['GIHS'] + "/" + formValue['Court_no_en'] + "/" + formValue['Ancillary_facilities_en'] + "/" + formValue['Opening_hours_en'] + "/" + formValue['Phone'] + "/" 
    + formValue['Remarks_en']+ "/"+ formValue['Longitude']+ "/" + formValue['Latitude'];

    this.http.put<any>(
        this.url,
        {
          bkId: formValue['bkId'],
          District_en: formValue['District_en'],
          Name_en: formValue['Name_en'],
          Address_en: formValue['Address_en'],
          GIHS: formValue['GIHS'],
          Court_no_en: formValue['Court_no_en'],
          Ancillary_facilities_en: formValue['Ancillary_facilities_en'],
          Opening_hours_en: formValue['Opening_hours_en'],
          Phone: formValue['Phone'],
          Remarks_en: formValue['Remarks_en'],
          Longitude: formValue['Longitude'] ,
          Latitude: formValue['Latitude']
        }
      ).subscribe({
        next: (res) => {
          console.log(res);
          this.serverData = res;
          this.serverDataArr = JSON.parse(JSON.stringify(res));
        },
        error: (res) => {
          this.serverData = "Server call failed: " + res;
        }
      });
      setTimeout(function() {
        document.getElementById("closeButton")?.click();
    }, 4000);
  }
    @Output() cancelUpdateEvent = new EventEmitter();
    cancelButtonHandler() {
      this.cancelUpdateEvent.emit();
    }
}
