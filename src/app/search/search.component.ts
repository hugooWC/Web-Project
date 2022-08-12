import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http'; 
import { BasketballRecord } from '../basketball.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  http: HttpClient;
  serverData!: Object | null;
  url!: string;
  serverDataArr!: any;

  basketRecord: BasketballRecord = {
    bkId: "",
    District_en: "",
    Name_en: "",
    Address_en: "",
    GIHS: "",
    Court_no_en: "",
    Ancillary_facilities_en: "",
    Opening_hours_en: "",
    Phone: "",
    Remarks_en: "",
    Longitude: "",
    Latitude: ""
  }

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.searchForm = fb.group(
      {
        'searchType': ['', Validators.required ],
        'searchKey': ['', Validators.required ]
      }
    );

  }

  ngOnInit(): void {
  }

  onSubmit(formValue: any): void {
    console.log(formValue);
    this.url = "http://localhost/atwdcw/index.php/search/"+ formValue['searchType'] +"/"+ formValue['searchKey'];
    this.http.get(this.url).subscribe(
      res => {    // anonymous function when AJAX succeeded 
        console.log(res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      },
      res => {    // anonymous function when AJAX failed
        console.log("Server error:" + res);
      }
    );

  }

  @Output() deleteEvent = new EventEmitter<BasketballRecord>();
  deleteButtonHandler(bkId: string) {
    console.log(bkId);
    for (let basketball of this.serverDataArr) {
      if (bkId === basketball.bkId) {
        this.basketRecord.bkId = basketball.bkId;
        this.basketRecord.District_en = basketball.District_en;
        this.basketRecord.Name_en = basketball.Name_en;
        this.basketRecord.Address_en = basketball.Address_en;
        this.basketRecord.GIHS = basketball.GIHS;
        this.basketRecord.Court_no_en = basketball.Court_no_en;
        this.basketRecord.Ancillary_facilities_en = basketball.Ancillary_facilities_en;
        this.basketRecord.Opening_hours_en = basketball.Opening_hours_en;
        this.basketRecord.Phone= basketball.Phone;
        this.basketRecord.Remarks_en = basketball.Remarks_en;
        this.basketRecord.Longitude = basketball.Longitude;
        this.basketRecord.Latitude = basketball.Latitude;
      }
    }
    this.deleteEvent.emit(this.basketRecord);
  }

  @Output() updateEvent = new EventEmitter<BasketballRecord>();
  updateButtonHandler(bkId: string) {
    console.log(bkId);
    
    for (let basketball of this.serverDataArr) {
      if (bkId === basketball.bkId) {
        this.basketRecord.bkId = basketball.bkId;
        this.basketRecord.District_en = basketball.District_en;
        this.basketRecord.Name_en = basketball.Name_en;
        this.basketRecord.Address_en = basketball.Address_en;
        this.basketRecord.GIHS = basketball.GIHS;
        this.basketRecord.Court_no_en = basketball.Court_no_en;
        this.basketRecord.Ancillary_facilities_en = basketball.Ancillary_facilities_en;
        this.basketRecord.Opening_hours_en = basketball.Opening_hours_en;
        this.basketRecord.Phone= basketball.Phone;
        this.basketRecord.Remarks_en = basketball.Remarks_en;
        this.basketRecord.Longitude = basketball.Longitude;
        this.basketRecord.Latitude = basketball.Latitude;
      }
    }
    this.updateEvent.emit(this.basketRecord);
  }

  @Output() createEvent = new EventEmitter();
  createButtonHandler() {
    console.log("create button");
    this.createEvent.emit();
  }


}
