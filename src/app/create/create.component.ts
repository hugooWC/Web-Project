import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { HttpClient, HttpResponse } from '@angular/common/http'; 


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  http: HttpClient;
  serverData!: Object | null;
  url!: string;
  serverDataArr!: any;

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.createForm = fb.group(
      {
        'addDistrict': ['', Validators.required ],
        'addName': ['', Validators.required ],
        'addAddress': ['', Validators.required ],
        'addGihs': ['', Validators.required ],
        'addCourt': ['', Validators.required ],
        'addAF': ['', Validators.required ],
        'addOpenhrs': ['', Validators.required ],
        'addPhone': ['', Validators.required ],
        'addRemarks': ['', Validators.required ],
        'addLongitude': ['', Validators.required ],
        'addLatitude': ['', Validators.required ]
      }
    );
   }

  ngOnInit(): void {
  }

  onSubmit(formValue: any): void {
    this.url = "http://localhost/atwdcw/index.php/search/add/" + formValue['addDistrict'] + "/" + formValue['addName'] + "/" + formValue['addAddress'] + "/"
    + formValue['addGihs'] + "/" + formValue['addCourt'] + "/" + formValue['addAF'] + "/" + formValue['addOpenhrs'] + "/" + formValue['addPhone'] + "/" + formValue['addRemarks']
    + "/"+ formValue['addLongitude']+ "/" + formValue['addLatitude'];

    this.http.post<any>(
        this.url,
        {
          addDistrict: formValue['addDistrict'],
          addName: formValue['addName'],
          addAddress: formValue['addAddress'],
          addGihs: formValue['addGihs'],
          addCourt: formValue['addCourt'],
          addAF: formValue['addAF'],
          addOpenhrs: formValue['addOpenhrs'],
          addPhone: formValue['addPhone'],
          addRemarks: formValue['addRemarks'],
          addLongitude: formValue['addLongitude'] ,
          addLatitude: formValue['addLatitude']
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
  @Output() cancelCreateEvent = new EventEmitter();
  cancelButtonHandler() {
  this.cancelCreateEvent.emit();
  }

}
