import { Subject } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
declare var window: any;
@Component({
  selector: 'app-businesspermitbyid',
  templateUrl: './businesspermitbyid.component.html',
  styleUrls: ['./businesspermitbyid.component.scss'], 
})
export class BusinesspermitbyidComponent implements OnInit {
  public businesspermitId: any;
  public userid: any;
  public createNewBusinessPermitFormGroup: FormGroup;
  public disabledAll: boolean = true;
  public lineofbusiness: any[] = [];
  public status: string = '';
  public applicantFullname: string = '';
  public realtime  = new Subject<any>()
  public remarks : string = ''
  public applicantEmail: string = ''
  public userId: string = ''
  closeResult: string = '';
  formModal: any;
  formModalApproved: any;
  rescheduleAppointment: any;
  public AppointmentSchedule: string = ''
dateAppointment: string = ''
DateApproved: string = ''
  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private router: Router
  ) 
  {
    this.businesspermitId = this.actRoute.snapshot.paramMap.get('id');
    
    this.createNewBusinessPermitFormGroup = this.formBuilder.group({
      type: [''],
      modeofpayment: ['', [Validators.required]],
      dateofapplication: ['', [Validators.required]],
      tinno: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{3}-{3}-{3}-{3}$|^\d\d\d-\d\d\d-\d\d\d-\d\d\d$/
          ),
        ],
      ],
      dtiseccdaregistrationnumber: ['', [Validators.required]],
      dtiseccdaregistrationdate: ['', [Validators.required]],
      typeofbusiness: ['', [Validators.required]],
      taxincentivegovernmententity: ['', [Validators.required]],
      specifytheentity: ['', [Validators.required]],
      taxpayerlastname: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      taxpayerfirstname: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      taxpayermiddlename: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      taxpayerbusinessname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(4),
        ],
      ],
      tradenamefranchise: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(4),
        ],
      ],
      lineofbusiness: ['', [Validators.required]],
      numberofunits: ['', [Validators.required]],
      capitalization: ['', [Validators.required]],
      essential: ['', [Validators.required]],
      nonessential: ['', [Validators.required]],
      lineofbusiness2: [''],
      numberofunits2: [''],
      capitalization2: [''],
      essential2: [''],
      nonessential2: [''],
      lineofbusiness3: [''],
      numberofunits3: [''],
      capitalization3: [''],
      essential3: [''],
      nonessential3: [''],
      lineofbusiness4: [''],
      numberofunits4: [''],
      capitalization4: [''],
      essential4: [''],
      nonessential4: [''],
      lineofbusiness5: [''],
      numberofunits5: [''],
      capitalization5: [''],
      essential5: [''],
      nonessential5: [''],
      iagreecheckbox: [false, [Validators.requiredTrue]],
      signatureofapplicant: ['', [Validators.required]],
      from: [''],
      to: [''],

      //other information
      businessaddress: ['', [Validators.required, Validators.minLength(4)]],
      businesspostalcode: ['', [Validators.required, Validators.minLength(4)]],
      businessemailaddress: ['', [Validators.required, Validators.email]],
      businesstelephone: ['', [Validators.required]],
      businessmobile: ['', [Validators.required]],

      ownersaddress: ['', [Validators.required, Validators.minLength(4)]],
      ownerspostalcode: ['', [Validators.required, Validators.minLength(4)]],
      ownersemailaddress: ['', [Validators.required, Validators.email]],
      ownerstelephone: ['', [Validators.required]],
      ownersmobile: ['', [Validators.required]],

      incaseofemergencyperson: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],

      incaseofemergencypersontelephonenumber: ['', [Validators.required]],

      incaseofemergencypersonemail: [
        '',
        [Validators.required, Validators.email],
      ],
      incaseofemergencypersonbusinessarea: ['', [Validators.required]],

      grossreceipt: ['', [Validators.required]],

      totalnumberofmale: ['', [Validators.required]],

      totalnumberoffemale: ['', [Validators.required]],

      numberofemployeeslgu: ['', [Validators.required]],

      lessorsfullname: [
        '',
        // [
        //   Validators.required,
        //   Validators.pattern(/^[a-zA-Z ]+$/)
        // ]
      ],
      lessorsaddress: [
        '',
        // [
        //   Validators.required
        // ]
      ],

      lessorstelorphone: [
        '',
        // [
        //   Validators.required
        // ]
      ],
      lessorsemail: [
        '',
        // [
        //   Validators.required,
        //   Validators.email
        // ]
      ],

      monthlyrental: [
        '',
        // [
        //   Validators.required
        // ]
      ],
    });

    
  }

  ngOnInit(): void {
    this.getBusinessPermit();
    setInterval(() => 
    {
      this.getBusinessPermit();
    }, 5000)
    this.formModal = new window.bootstrap.Modal
    (
      document.getElementById("exampleModal")
    )
    this.formModalApproved = new window.bootstrap.Modal
    (
      document.getElementById("approvedApplication")
    )
    this.rescheduleAppointment = new window.bootstrap.Modal
    (
      document.getElementById("rescheduleAppointmentApplication")
    )
  }
  async getBusinessPermit() {
    var obj = {
      id: this.businesspermitId,
    };
    await this.authService.getBusinessPermitById(obj).subscribe((data) => {
      //AppointmentSchedule
      console.log('business permitid', data.data[0]);
      var businesspermitData = data.data[0];
      //DateApproved
      // this.createNewBusinessPermitFormGroup.controls['type'].value
      this.DateApproved = businesspermitData.DateApproved
      this.createNewBusinessPermitFormGroup.controls['type'].setValue(
        businesspermitData.Type
      );
      this.createNewBusinessPermitFormGroup.controls[
        'signatureofapplicant'
      ].setValue(businesspermitData.ApplicantSignature);
      this.userid = data.data[0].UserId;
      this.status = businesspermitData.Status;
      this.getuserById(this.userid);
      this.getBasicInformation(businesspermitData.BusinessPermitId);
      this.getAmendment(businesspermitData.BusinessPermitId);
      this.otherInformation(businesspermitData.BusinessPermitId);
      this.lineOfBusiness(businesspermitData.BusinessPermitId);
      this.AppointmentSchedule = businesspermitData.AppointmentSchedule
      console.log("appointmentschedule", this.AppointmentSchedule)
    });
  }
  async getuserById(userid: any) {
    var obj = {
      id: userid,
    };
    await this.authService.getUsersById(obj).subscribe((data) => {
      //console.log('userid', data.data[0]);
      //email
      this.applicantEmail = data.data[0].email
      this.userId = 
      this.applicantFullname = `${data.data[0].firstname} ${data.data[0].middlename} ${data.data[0].lastname}`;
    });
  }

  async getBasicInformation(id: any) {
    var obj = {
      id: id,
    };
    await this.authService
      .getBasicInformationByBusinessPermitId(obj)
      .subscribe((data) => {
        var basicinformation = data.data[0];
        //console.log('Basic information', basicinformation);
        this.createNewBusinessPermitFormGroup.controls[
          'modeofpayment'
        ].setValue(basicinformation.ModeOfPayment);
        this.createNewBusinessPermitFormGroup.controls[
          'dateofapplication'
        ].setValue(basicinformation.DateOfApplication);
        this.createNewBusinessPermitFormGroup.controls['tinno'].setValue(
          basicinformation.TinNo
        );
        this.createNewBusinessPermitFormGroup.controls[
          'dtiseccdaregistrationnumber'
        ].setValue(basicinformation.DtiSecCdaRegistrationNumber);
        this.createNewBusinessPermitFormGroup.controls[
          'dtiseccdaregistrationdate'
        ].setValue(basicinformation.DtiSecCdaRegistrationDate);
        this.createNewBusinessPermitFormGroup.controls[
          'typeofbusiness'
        ].setValue(basicinformation.TypeOfBusiness);
        this.createNewBusinessPermitFormGroup.controls[
          'taxincentivegovernmententity'
        ].setValue(basicinformation.TaxIncentiveGovernmentEntity);
        this.createNewBusinessPermitFormGroup.controls[
          'specifytheentity'
        ].setValue(basicinformation.SpecifyEntity);

        this.createNewBusinessPermitFormGroup.controls[
          'taxpayerlastname'
        ].setValue(basicinformation.TaxPayerLastName);
        this.createNewBusinessPermitFormGroup.controls[
          'taxpayerfirstname'
        ].setValue(basicinformation.TaxPayerFirstName);
        this.createNewBusinessPermitFormGroup.controls[
          'taxpayermiddlename'
        ].setValue(basicinformation.TaxPayerMiddleName);
        this.createNewBusinessPermitFormGroup.controls[
          'taxpayerbusinessname'
        ].setValue(basicinformation.TaxPayerBusinessName);
        this.createNewBusinessPermitFormGroup.controls[
          'tradenamefranchise'
        ].setValue(basicinformation.TradeNameFranchise);
      });
  }
  async getAmendment(id: any) {
    var obj = {
      id: id,
    };
    await this.authService
      .getAmendmentByBusinessPermitId(obj)
      .subscribe((data) => {
        var amendment = data.data[0];
        //console.log('amendment', amendment);
        this.createNewBusinessPermitFormGroup.controls['from'].setValue(
          amendment.Mula
        );
        this.createNewBusinessPermitFormGroup.controls['to'].setValue(
          amendment.Hanggang
        );
      });
  }
  async otherInformation(id: any) {
    var obj = {
      id: id,
    };
    await this.authService
      .getotherInformationByBusinessPermitId(obj)
      .subscribe((data) => {
        var otherInformation = data.data[0];
        console.log('otherInformation', otherInformation);
        this.createNewBusinessPermitFormGroup.controls[
          'businessaddress'
        ].setValue(otherInformation.BusinessAddress);
        this.createNewBusinessPermitFormGroup.controls[
          'businesspostalcode'
        ].setValue(otherInformation.BusinessPostalCode);
        this.createNewBusinessPermitFormGroup.controls[
          'businessemailaddress'
        ].setValue(otherInformation.BusinessEmailAddress);
        this.createNewBusinessPermitFormGroup.controls[
          'businesstelephone'
        ].setValue(otherInformation.BusinessTelephoneNumber);
        this.createNewBusinessPermitFormGroup.controls[
          'businessmobile'
        ].setValue(otherInformation.BusinessMobileNumber);
        this.createNewBusinessPermitFormGroup.controls[
          'ownersaddress'
        ].setValue(otherInformation.OwnersAddress);
        this.createNewBusinessPermitFormGroup.controls[
          'ownerspostalcode'
        ].setValue(otherInformation.OwnersPostalCode);

        this.createNewBusinessPermitFormGroup.controls[
          'ownersemailaddress'
        ].setValue(otherInformation.OwnersEmailAddress);

        this.createNewBusinessPermitFormGroup.controls[
          'ownerstelephone'
        ].setValue(otherInformation.OwnersTelephoneNumber);

        this.createNewBusinessPermitFormGroup.controls['ownersmobile'].setValue(
          otherInformation.OwnersMobileNumber
        );

        this.createNewBusinessPermitFormGroup.controls[
          'incaseofemergencyperson'
        ].setValue(otherInformation.IncaseOfEmergencyContactPerson);

        this.createNewBusinessPermitFormGroup.controls[
          'incaseofemergencypersontelephonenumber'
        ].setValue(otherInformation.IncaseOfEmergencyPhoneorMobileNumber);

        this.createNewBusinessPermitFormGroup.controls[
          'incaseofemergencypersonemail'
        ].setValue(otherInformation.IncaseOfEmergencyEmailAddress);

        this.createNewBusinessPermitFormGroup.controls[
          'incaseofemergencypersonbusinessarea'
        ].setValue(otherInformation.BusinessAreaInSqm);

        this.createNewBusinessPermitFormGroup.controls['grossreceipt'].setValue(
          otherInformation.GrossSalesReceipts
        );

        this.createNewBusinessPermitFormGroup.controls[
          'totalnumberofmale'
        ].setValue(otherInformation.TotalNoOfEmployeesMale);

        this.createNewBusinessPermitFormGroup.controls[
          'totalnumberoffemale'
        ].setValue(otherInformation.TotalNoOfEmployeesFemale);

        this.createNewBusinessPermitFormGroup.controls[
          'numberofemployeeslgu'
        ].setValue(otherInformation.NumberOfEmployeesResidingLGU);

        this.createNewBusinessPermitFormGroup.controls[
          'lessorsfullname'
        ].setValue(otherInformation.LessorsFullname);

        this.createNewBusinessPermitFormGroup.controls[
          'lessorsaddress'
        ].setValue(otherInformation.LessorsAddress);

        this.createNewBusinessPermitFormGroup.controls[
          'lessorstelorphone'
        ].setValue(otherInformation.LessorsTelephoneMobileNumber);

        this.createNewBusinessPermitFormGroup.controls['lessorsemail'].setValue(
          otherInformation.LessorsEmailAddress
        );

        this.createNewBusinessPermitFormGroup.controls[
          'monthlyrental'
        ].setValue(otherInformation.LessorsMonthlyRental);
      });
  }

  async lineOfBusiness(id: any) {
    var obj = {
      id: id,
    };
    await this.authService
      .getLineofBusinessByBusinessPermitId(obj)
      .subscribe((data) => {
        //console.log('the data', data.data);
        this.lineofbusiness = data.data;
        //var lineofbusiness = data.data
        //console.log("lineofbusiness", lineofbusiness[0])
        //lineofbusiness[0]
        // var lineofbusiness = data.data[0].LineOfBusiness == undefined || data.data[0].LineOfBusiness == null || data.data[0].LineOfBusiness == '' ?
        // '' : data.data[0].LineOfBusiness

        // var NoOfUnits = data.data[0].NoOfUnits == undefined || data.data[0].NoOfUnits == null || data.data[0].NoOfUnits == '' ?
        // '' : data.data[0].NoOfUnits

        // var Capitalization = data.data[0].Capitalization == undefined || data.data[0].Capitalization == null || data.data[0].Capitalization == '' ?
        // '' : data.data[0].Capitalization

        // var Essential = data.data[0].Essential == undefined || data.data[0].Essential == null || data.data[0].Essential == '' ?
        // '' : data.data[0].Essential

        // var NonEssential = data.data[0].NonEssential == undefined || data.data[0].NonEssential == null || data.data[0].NonEssential == '' ?
        // '' : data.data[0].NonEssential

        // //lineofbusiness[1]
        // var lineofbusiness1 = data.data[1].LineOfBusiness == undefined || data.data[1].LineOfBusiness == null || data.data[1].LineOfBusiness == '' ?
        // '' : data.data[1].LineOfBusiness

        // var NoOfUnits1 = data.data[1].NoOfUnits == undefined || data.data[1].NoOfUnits == null || data.data[1].NoOfUnits == '' ?
        // '' : data.data[1].NoOfUnits

        // var Capitalization1 = data.data[1].Capitalization == undefined || data.data[1].Capitalization == null || data.data[1].Capitalization == '' ?
        // '' : data.data[1].Capitalization

        // var Essential1 = data.data[1].Essential == undefined || data.data[1].Essential == null || data.data[1].Essential == '' ?
        // '' : data.data[1].Essential

        // var NonEssential1 = data.data[1].NonEssential == undefined || data.data[1].NonEssential == null || data.data[1].NonEssential == '' ?
        // '' : data.data[1].NonEssential

        //     //lineofbusiness[2]
        //     var lineofbusiness2 = data.data[2].LineOfBusiness == undefined || data.data[2].LineOfBusiness == null || data.data[2].LineOfBusiness == '' ?
        //     '' : data.data[2].LineOfBusiness

        //     var NoOfUnits2 = data.data[2].NoOfUnits == undefined || data.data[2].NoOfUnits == null || data.data[2].NoOfUnits == '' ?
        //     '' : data.data[2].NoOfUnits

        //     var Capitalization2 = data.data[2].Capitalization == undefined || data.data[2].Capitalization == null || data.data[2].Capitalization == '' ?
        //     '' : data.data[2].Capitalization

        //     var Essential2 = data.data[2].Essential == undefined || data.data[2].Essential == null || data.data[2].Essential == '' ?
        //     '' : data.data[2].Essential

        //     var NonEssential2 = data.data[2].NonEssential == undefined || data.data[2].NonEssential == null || data.data[2].NonEssential == '' ?
        //     '' : data.data[2].NonEssential

        //          //lineofbusiness[3]
        //          var lineofbusiness3 = data.data[3].LineOfBusiness == undefined || data.data[3].LineOfBusiness == null || data.data[3].LineOfBusiness == '' ?
        //          '' : data.data[3].LineOfBusiness

        //          var NoOfUnits3 = data.data[3].NoOfUnits == undefined || data.data[3].NoOfUnits == null || data.data[3].NoOfUnits == '' ?
        //          '' : data.data[3].NoOfUnits

        //          var Capitalization3 = data.data[3].Capitalization == undefined || data.data[3].Capitalization == null || data.data[3].Capitalization == '' ?
        //          '' : data.data[3].Capitalization

        //          var Essential3 = data.data[3].Essential == undefined || data.data[3].Essential == null || data.data[3].Essential == '' ?
        //          '' : data.data[3].Essential

        //          var NonEssential3 = data.data[3].NonEssential == undefined || data.data[3].NonEssential == null || data.data[3].NonEssential == '' ?
        //          '' : data.data[3].NonEssential

        //          //lineofbusiness[4]
        //          var lineofbusiness4 = data.data[4].LineOfBusiness == undefined || data.data[4].LineOfBusiness == null || data.data[4].LineOfBusiness == '' ?
        //          '' : data.data[4].LineOfBusiness

        //          var NoOfUnits4 = data.data[4].NoOfUnits == undefined || data.data[4].NoOfUnits == null || data.data[4].NoOfUnits == '' ?
        //          '' : data.data[4].NoOfUnits

        //          var Capitalization4 = data.data[4].Capitalization == undefined || data.data[4].Capitalization == null || data.data[4].Capitalization == '' ?
        //          '' : data.data[4].Capitalization

        //          var Essential4 = data.data[4].Essential == undefined || data.data[4].Essential == null || data.data[4].Essential == '' ?
        //          '' : data.data[4].Essential

        //          var NonEssential4 = data.data[4].NonEssential == undefined || data.data[4].NonEssential == null || data.data[4].NonEssential == '' ?
        //          '' : data.data[4].NonEssential

        // this.createNewBusinessPermitFormGroup.controls['lineofbusiness'].setValue(lineofbusiness)
        // this.createNewBusinessPermitFormGroup.controls['numberofunits'].setValue(NoOfUnits)
        // this.createNewBusinessPermitFormGroup.controls['capitalization'].setValue(Capitalization)
        // this.createNewBusinessPermitFormGroup.controls['essential'].setValue(Essential)
        // this.createNewBusinessPermitFormGroup.controls['nonessential'].setValue(NonEssential)

        // this.createNewBusinessPermitFormGroup.controls['lineofbusiness2'].setValue(lineofbusiness1)
        // this.createNewBusinessPermitFormGroup.controls['numberofunits2'].setValue(NoOfUnits1)
        // this.createNewBusinessPermitFormGroup.controls['capitalization2'].setValue(Capitalization1)
        // this.createNewBusinessPermitFormGroup.controls['essential2'].setValue(Essential1)
        // this.createNewBusinessPermitFormGroup.controls['nonessential2'].setValue(NonEssential1)

        // this.createNewBusinessPermitFormGroup.controls['lineofbusiness3'].setValue(lineofbusiness2)
        // this.createNewBusinessPermitFormGroup.controls['numberofunits3'].setValue(NoOfUnits2)
        // this.createNewBusinessPermitFormGroup.controls['capitalization3'].setValue(Capitalization2)
        // this.createNewBusinessPermitFormGroup.controls['essential3'].setValue(Essential2)
        // this.createNewBusinessPermitFormGroup.controls['nonessential3'].setValue(NonEssential2)

        // this.createNewBusinessPermitFormGroup.controls['lineofbusiness4'].setValue(lineofbusiness3)
        // this.createNewBusinessPermitFormGroup.controls['numberofunits4'].setValue(NoOfUnits3)
        // this.createNewBusinessPermitFormGroup.controls['capitalization4'].setValue(Capitalization3)
        // this.createNewBusinessPermitFormGroup.controls['essential4'].setValue(Essential3)
        // this.createNewBusinessPermitFormGroup.controls['nonessential4'].setValue(NonEssential3)

        // this.createNewBusinessPermitFormGroup.controls['lineofbusiness5'].setValue(lineofbusiness4)
        // this.createNewBusinessPermitFormGroup.controls['numberofunits5'].setValue(NoOfUnits4)
        // this.createNewBusinessPermitFormGroup.controls['capitalization5'].setValue(Capitalization4)
        // this.createNewBusinessPermitFormGroup.controls['essential5'].setValue(Essential4)
        // this.createNewBusinessPermitFormGroup.controls['nonessential5'].setValue(NonEssential4)
      });
  }
  async rejectBusinessPermit() 
  {
    if (this.remarks == '' || this.remarks == undefined || this.remarks == null)
    {
        alert("Remarks shouldn't be empty")
    }
    else 
    {
      this.spinner.show().then(() => {});
      var obj = {
        businesspermitid: this.businesspermitId,
        status: 'Rejected',
      };
      await this.authService.updateBusinessPermitStatus(obj).subscribe(async (data) => 
      {
        if (data.success == 1) {
          let objForSendEmail = 
          {
            to: this.applicantEmail,
            subject: "Your business permit application has been rejected",
            text: this.remarks
          }
          await this.authService.sendGridEmail(objForSendEmail).subscribe(data => 
            {
             
              //console.log("send grid", data)
              if (data.success == 1)
              {
                
              }
              else 
              {
                this.alertService.success(data.message);
                this.spinner.hide();
              }
            })
            setTimeout(() => {
              this.spinner.hide();
              this.alertService.success('Business permit rejected successfully!');
              this.realtime.next(this.getBusinessPermit())
                this.formModal.hide()
            }, 1000);  
        } 
        else 
        {
          this.alertService.danger(data.message);
        }
      });
     
    }
  }
  async approveBusinessPermit() {
    var converted = moment(this.dateAppointment).format('LL');
    var converted2 = moment(this.dateAppointment).format('YYYY-MM-DD');
    var dateapproved = moment(new Date()).format('YYYY-MM-DD');
    if (this.dateAppointment == '' || this.dateAppointment == undefined || this.dateAppointment == null)
    {
        alert("Date shouldn't be empty")
    }
    else 
    {
      this.spinner.show().then(() => {});
      var obj = {
        businesspermitid: this.businesspermitId,
        status: 'Approved',
        appointmentschedule: converted2,
        dateapproved: dateapproved
      };
      await this.authService.updateBusinessPermitStatus(obj).subscribe(async (data) => 
      {
        if (data.success == 1) {
          let objForSendEmail = 
          {
            to: this.applicantEmail,
            subject: "Your business permit application has been approved",
            text: `Please come to city hall on ${converted} for some required informations, Thank you!`,
            html: `Please come to city hall on ${converted} for some required informations, Thank you!
            <br>
            <h5>Type :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['type'].value}</p>
            <br>
            <h5>Taxpayer/Registrant Fullname :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['taxpayerfirstname'].value} ${this.createNewBusinessPermitFormGroup.controls['taxpayermiddlename'].value} ${this.createNewBusinessPermitFormGroup.controls['taxpayerlastname'].value}</p>
            <br>
            <h5>Business Name :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['taxpayerbusinessname'].value}</p>
            <br>
            <h5>Trade Name / Franchise :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['tradenamefranchise'].value}</p>`
          }
          await this.authService.sendGridEmail(objForSendEmail).subscribe(async data => 
            {
              //console.log("send grid", data)
              if (data.success == 1)
              {
                var objForUpdatingBusinessPermitLength = 
                {
                  id: this.userid
                }
                await this.authService.updateUsersBusinessPermitlength(objForUpdatingBusinessPermitLength).subscribe(data => 
                  {
                        if (data.success == 0)
                        {
                          alert(data.message)
                        }
                  }) 
              }
              else 
              {
                this.alertService.success(data.message);
                this.spinner.hide();
              }
            })

            setTimeout(() => {
              this.spinner.hide();
              this.alertService.success('Business permit approved successfully!');
              this.realtime.next(this.getBusinessPermit())
                this.formModalApproved.hide()
            }, 1000); 
        } 
        else 
        {
          this.alertService.danger(data.message);
        }
      });
      
     
    }
  }

  async showRejectModal()
  {
    await  this.formModal.show()
  }
  async showApproveModal()
  {
    await  this.formModalApproved.show()
  }
  async showReschedAppointmentModal()
  {
    await this.rescheduleAppointment.show();
  }
  async editScheduleAppointment()
{
  if (this.AppointmentSchedule == '' || this.AppointmentSchedule == undefined || this.AppointmentSchedule == null)
  {
      alert("Date shouldn't be empty")
  }
  else 
  {
    var converted2 = moment(this.AppointmentSchedule).format('YYYY-MM-DD');
    this.spinner.show().then(() => {});
    var obj = {
      businesspermitid: this.businesspermitId,
      appointmentschedule: converted2,
      
    };
    this.authService.updateBusinessPermitAppointmentSchedule(obj).subscribe(async data => 
      {
        if (data.success == 1)
        {
          let objForSendEmail = 
          {
            to: this.applicantEmail,
            subject: "Your approved business permit application has been rescheduled",
            text: `Please come to city hall on ${converted2} for some required informations, Thank you!`,
            html: `Please come to city hall on ${converted2} for some required informations, Thank you!
            <br>
            <h5>Type :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['type'].value}</p>
            <br>
            <h5>Taxpayer/Registrant Fullname :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['taxpayerfirstname'].value} ${this.createNewBusinessPermitFormGroup.controls['taxpayermiddlename'].value} ${this.createNewBusinessPermitFormGroup.controls['taxpayerlastname'].value}</p>
            <br>
            <h5>Business Name :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['taxpayerbusinessname'].value}</p>
            <br>
            <h5>Trade Name / Franchise :</h5> <p>${this.createNewBusinessPermitFormGroup.controls['tradenamefranchise'].value}</p>`
          }
          await this.authService.sendGridEmail(objForSendEmail).subscribe(async data => 
            {
              //console.log("send grid", data)
              if (data.success == 1)
              { 
              }
            })
            setTimeout(() => {
              this.spinner.hide();
              this.alertService.success('Business permit rescheduled successfully!');
              this.realtime.next(this.getBusinessPermit())
                this.rescheduleAppointment.hide()
            }, 1000);
            
        }
        else 
        {
          this.alertService.danger(data.message);
        }
      })
  }
}

printoutNewTab()
{
  window.open(window.location.href.replace(this.router.url,"") + "/printout/" + this.applicantEmail + `_${this.businesspermitId}`, '_blank')
}
}
