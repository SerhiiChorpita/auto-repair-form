import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../shared/services/email-service/email.service';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  public model!: NgbDateStruct;
  public today = this.calendar.getToday();
  public todayDate: Date = new Date();

  public stepTwoStatus: boolean = false;

  public title = 'nodeMailerApp';


  constructor(
    private calendar: NgbCalendar,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  formData(form: NgForm): void {
    console.log(form.valid);
    console.log(form);
  }

  setStatusStepTwo(form: NgForm): boolean {
    let checkForm = (inpName: string) => form.controls[`${inpName}`].valid;

    if (checkForm('mark') && checkForm('model') && checkForm('year') && checkForm('toBeRepaired')) {
      return this.stepTwoStatus = true;
    }
    return this.stepTwoStatus = false;
  }

  senEmail(form: NgForm): void {
    let date = form.controls['dateOfRepair'].value;

    let email = 'serhii.chorpita@gmail.com'; //replace with your email

    let html = `<h1>JOB DESCRIPTION</h1><p><b>VEHICLE:</b></p><p>mark: <i>${form.controls['mark'].value}</i>;</p><p>model: <i>${form.controls['model'].value}</i>;</p><p>year: <i>${form.controls['year'].value}</i>;</p><p><b>NEED TO BE REPAIRED:</b></p><p><i>${form.controls['toBeRepaired'].value}</i>;</p><p><b>Additional info:</b></p><p>category of work: <i>${form.controls['categoryOfWork'].value}</i>;</p><p>subcategory: <i>${form.controls['subcategory'].value}</i>;</p><p>select emirate: <i>${form.controls['emirate'].value}</i>;</p><p><b>else:</b></p><p>Need to truck: <i>${form.controls['needToTruck'].value ? 'Yes' : 'No'}</i>;</p><p>Need car Pickup: <i>${form.controls['needCarPickup'].value ? 'Yes' : 'No'}</i>;</p><p>Custom Parts: <i>${form.controls['customParts'].value ? 'Yes' : 'No'}</i>;</p><p><b>Desired date of repair:</b><span> <u>${date.year}-${date.month}-${date.day}</u></span></p>`;

    let reqObj = {
      email: email,
      html: html
    }

    this.emailService.sendMessage(reqObj).subscribe(data => {
      console.log('data', data);

      alert('Job request was sended seccessfully!')
      return form.resetForm();
    },
      err => console.log(err))
  }

}
