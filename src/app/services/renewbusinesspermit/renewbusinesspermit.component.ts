import { SignaturePadComponent, NgSignaturePadOptions } from '@almothafar/angular-signature-pad';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Modeofpayment } from 'src/app/interface/modeofpayment';
import { Typeofbusiness } from 'src/app/interface/typeofbusiness';
import * as moment from 'moment';
@Component({
  selector: 'app-renewbusinesspermit',
  templateUrl: './renewbusinesspermit.component.html',
  styleUrls: ['./renewbusinesspermit.component.scss']
})
export class RenewbusinesspermitComponent implements OnInit {
  @ViewChild('checkboxiagree') checkboxiagree!: ElementRef;
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent | any;
   signaturePadOptions: NgSignaturePadOptions = { 
    //maxWidth: 5,
    minWidth: 3,
    canvasWidth: 730,
    canvasHeight: 200,
    //throttle: 1,
    //velocityFilterWeight: 500
    backgroundColor: 'white',
    //penColor: 'whitesmoke'
  };
  firstname: string = ''
  lastname: string = ''
  city: string = ''
  public businesspermitlength: number = 0
  public theresnoAlreadyBusinessPermit: boolean = false
  public modeOfPaymentList: Modeofpayment[] = []
  public typeOfBusinessList: Typeofbusiness[] = []
  public createNewBusinessPermitFormGroup: FormGroup;
  public disableSpecifyEntityTextArea: boolean = false
  public signaturevaluetrue: boolean = false;
  public startwriting: boolean = false
  constructor(private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private authService: AuthServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private alertService: AlertService) 
  { 
    this.createNewBusinessPermitFormGroup = this.formBuilder.group({
      modeofpayment: [
        '', 
        [
          Validators.required
        ]
      ],
      dateofapplication: [
        '', 
        [
          Validators.required
        ]
      ],
      tinno: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-{3}-{3}-{3}$|^\d\d\d-\d\d\d-\d\d\d-\d\d\d$/),
          this.aNumberPatternValid({ pattern: /^\d{3}-{3}-{3}-{3}$|^\d\d\d-\d\d\d-\d\d\d-\d\d\d$/, msg: 'Invalid Tin No. Format' }),
        ],
      ],
      dtiseccdaregistrationnumber: [
        '',
        [
          Validators.required
        ]
      ],
      dtiseccdaregistrationdate: [
        '',
        [
          Validators.required
        ]
      ],
      typeofbusiness: [
        '',
        [
          Validators.required
        ]
      ],
      taxincentivegovernmententity: 
      [
        '',
        [Validators.required]
      ],
      specifytheentity: 
      [
        '',
        [Validators.required]
      ],
      taxpayerlastname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      taxpayerfirstname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      taxpayermiddlename: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      taxpayerbusinessname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(4)
        ]
      ],
      tradenamefranchise: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(4)
        ]
      ],
      lineofbusiness: 
      [
        '',
        [Validators.required]
      ],
      numberofunits: 
      [
        '',
        [Validators.required]
      ],
      capitalization: 
      [
        '',
        [Validators.required]
      ],
      essential: 
      [
        '',
        [Validators.required]
      ],
      nonessential: 
      [
        '',
        [Validators.required]
      ],
      lineofbusiness2: 
      [
        ''
      ],
      numberofunits2: 
      [
        ''
      ],
      capitalization2: 
      [
        ''
      ],
      essential2: 
      [
        ''
      ],
      nonessential2: 
      [
        ''
      ],
      lineofbusiness3: 
      [
        ''
      ],
      numberofunits3: 
      [
        ''
      ],
      capitalization3: 
      [
        ''
      ],
      essential3: 
      [
        ''
      ],
      nonessential3: 
      [
        ''
      ],
      lineofbusiness4: 
      [
        ''
      ],
      numberofunits4: 
      [
        ''
      ],
      capitalization4: 
      [
        ''
      ],
      essential4: 
      [
        ''
      ],
      nonessential4: 
      [
        ''
      ],
      lineofbusiness5: 
      [
        ''
      ],
      numberofunits5: 
      [
        ''
      ],
      capitalization5: 
      [
        ''
      ],
      essential5: 
      [
        ''
      ],
      nonessential5: 
      [
        ''
      ],
      iagreecheckbox: [
        false,
        [Validators.requiredTrue]
      ],
      signatureofapplicant: [
        '',
        [Validators.required]
      ],
      from: [
        ''
      ],
      to: [
        ''
      ],

      //other information
      businessaddress: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      businesspostalcode: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ],
        
      ],
      businessemailaddress: [
        '',
        [
          Validators.required,
          Validators.email
        ],
      ],
      businesstelephone: [
        '',
        [
          Validators.required,
          
        ],
      ],
      businessmobile: [
        '',
        [
          Validators.required,
          
        ],
      ],


      ownersaddress: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      ownerspostalcode: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ],
        
      ],
      ownersemailaddress: [
        '',
        [
          Validators.required,
          Validators.email
        ],
      ],
      ownerstelephone: [
        '',
        [
          Validators.required,
          
        ],
      ],
      ownersmobile: [
        '',
        [
          Validators.required,
          
        ],
      ],

      incaseofemergencyperson: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ],
      ],

      incaseofemergencypersontelephonenumber: [
        '',
        [
          Validators.required,
        ],
      ],
      
      incaseofemergencypersonemail: [
        '',
        [
          Validators.required,
          Validators.email
        ],
        
      ],
      incaseofemergencypersonbusinessarea: [
        '',
        [
          Validators.required
        ],
        
      ],

      grossreceipt: [
        '',
        [
          Validators.required
        ],
        
      ],

      totalnumberofmale: [
        '',
        [
          Validators.required
        ],
        
      ],

      totalnumberoffemale: [
        '',
        [
          Validators.required
        ],
        
      ],

      numberofemployeeslgu: [
        '',
        [
          Validators.required
        ],
        
      ],

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

    if (this.createNewBusinessPermitFormGroup.controls['taxincentivegovernmententity'].value
    == '')
    {
      this.disableSpecifyEntityTextArea = true
      this.createNewBusinessPermitFormGroup.controls['specifytheentity'].setValue('NONE')
    }

    
    
  }
  specifyEntity(event: any)
  {
    const query = event.target.value;
    if (query == 'YES')
    {
      this.disableSpecifyEntityTextArea = false
      this.createNewBusinessPermitFormGroup.controls['specifytheentity'].setValue('')
    }
    else 
    {
      
      this.disableSpecifyEntityTextArea = true
      this.createNewBusinessPermitFormGroup.controls['specifytheentity'].setValue('NONE')
    }
  }
  get f() 
  {
    return this.createNewBusinessPermitFormGroup.controls;
  }

  tinWrongFormat: boolean = false
    aNumberPatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.tinWrongFormat = true
  
        
      } else {
        this.tinWrongFormat = false
      }
    };
  }
   ngOnInit(): void {
    this.ngAfterViewInit()
    // this.spinner.show().then(() => {

    // })
  }

  

  iagreeEvent(event: any)
  {
    
    //console.log("event", event)
    var query = event.target.value
    //console.log("i agree event", query)
  }

  ngAfterViewInit() {
    this.signaturePad.off()
    this.startwriting = false
    // this.signaturePad is now available
    //this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log('Completed drawing', event);
    //console.log(this.signaturePad.toDataURL());
    //this.signaturePad.clear()
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('Start drawing', event);
    this.createNewBusinessPermitFormGroup.controls['signatureofapplicant'].setValue('haveValue');
    this.signaturevaluetrue = true
  }
  clearSignature()
  { 
    this.signaturePad.clear()
    this.createNewBusinessPermitFormGroup.controls['signatureofapplicant'].setValue('');
    this.signaturevaluetrue = false
    this.ngAfterViewInit()
  }

 async sumbmitBusinessPermit()
  {

    var token = localStorage.getItem('user')  

    if (!this.createNewBusinessPermitFormGroup.valid)
    {
      window.scroll(-500, -500)
      this.alertService.danger(`Please fill all the required fields with asterisk(*) 
      and make sure it is in the correct format`);
    }
    else 
    {
      window.scroll(-500, -500)
      this.spinner.show().then(() => {

      })
      await this.createBusinessPermitFunction()

      // this.afstore.collection('Businesspermit')
      // .add({
      //   DateCreated: moment(new Date()).format("MM-DD-YYYY HH:MM"),
      //   Type: 'New',
      //   Status: 'Pending',
      //   ApplicantSignature: this.signaturePad.toDataURL(), 
      //   BasicInformation: this.basicInformationColumns(),
      //   Amendment: this.amendMentColumns(),
      //   BusinessActivity: this.businessActivityColumns(),
      //   OtherInformation: this.otherInformation()

      // }).then(el => 
      //   {
      //     setTimeout(() => {
      //       this.spinner.hide()
      //       this.alertService.success('Successfully submitted business permit!');
      //       this.createNewBusinessPermitFormGroup.reset();
      //       this.clearSignature()
      //     }, 4000);
      //   })
    }
  }
  startWriting()
  {
    this.signaturePad.on()
    this.startwriting = true
  }

  async basicInformationColumns()
  {
    var basicInformationObject = await 
    [
    {
      
      ModeOfPayment: this.createNewBusinessPermitFormGroup.controls['modeofpayment'].value,
      DateOfApplication: this.createNewBusinessPermitFormGroup.controls['dateofapplication'].value,
      TinNo: this.createNewBusinessPermitFormGroup.controls['tinno'].value,
      DtiSecCdaRegistrationNumber: this.createNewBusinessPermitFormGroup.controls['dtiseccdaregistrationnumber'].value,
      DtiSecCdaRegistrationDate: this.createNewBusinessPermitFormGroup.controls['dtiseccdaregistrationdate'].value,
      TypeOfBusiness: this.createNewBusinessPermitFormGroup.controls['typeofbusiness'].value,
      TaxIncentiveGovernmentEntity: this.createNewBusinessPermitFormGroup.controls[' taxincentivegovernmententity'].value,
      SpecifyEntity: this.createNewBusinessPermitFormGroup.controls['specifytheentity'].value,
      TaxPayerLastName: this.createNewBusinessPermitFormGroup.controls['taxpayerlastname'].value.toUpperCase(),
      TaxPayerFirstName: this.createNewBusinessPermitFormGroup.controls['taxpayerfirstname'].value.toUpperCase(),
      TaxPayerMiddleName: this.createNewBusinessPermitFormGroup.controls['taxpayermiddlename'].value.toUpperCase(),
      TaxPayerBusinessName: this.createNewBusinessPermitFormGroup.controls['taxpayerbusinessname'].value.toUpperCase(),
      TradeNameFranchise: this.createNewBusinessPermitFormGroup.controls['tradenamefranchise'].value.toUpperCase(),
    }
  ]
    return basicInformationObject
  }

  async amendMentColumns()
  {
    var amendMentObjects = await 
    [
    {
      From: this.createNewBusinessPermitFormGroup.controls['from'].value,
      To: this.createNewBusinessPermitFormGroup.controls['to'].value,
    }
  ]
    return amendMentObjects;
  }

  async businessActivityColumns()
  {



    var businessActivityObjects =  await
    [
    {
      LineOfBusiness1: this.createNewBusinessPermitFormGroup.controls['lineofbusiness'].value,
      NoOfUnits1: this.createNewBusinessPermitFormGroup.controls['numberofunits'].value,
      Capitalization1: this.createNewBusinessPermitFormGroup.controls['capitalization'].value,
      Essential1: this.createNewBusinessPermitFormGroup.controls['essential'].value,
      NonEssential1: this.createNewBusinessPermitFormGroup.controls['nonessential'].value,
      LineOfBusiness2: this.createNewBusinessPermitFormGroup.controls['lineofbusiness2'].value,
      NoOfUnits2: this.createNewBusinessPermitFormGroup.controls['numberofunits2'].value,
      Capitalization2: this.createNewBusinessPermitFormGroup.controls['capitalization2'].value,
      Essential2: this.createNewBusinessPermitFormGroup.controls['essential2'].value,
      NonEssential2: this.createNewBusinessPermitFormGroup.controls['nonessential2'].value,
      LineOfBusiness3: this.createNewBusinessPermitFormGroup.controls['lineofbusiness3'].value,
      NoOfUnits3: this.createNewBusinessPermitFormGroup.controls['numberofunits3'].value,
      Capitalization: this.createNewBusinessPermitFormGroup.controls['capitalization3'].value,
      Essential3: this.createNewBusinessPermitFormGroup.controls['essential3'].value,
      NonEssential3: this.createNewBusinessPermitFormGroup.controls['nonessential3'].value,
      LineOfBusiness4: this.createNewBusinessPermitFormGroup.controls['lineofbusiness4'].value,
      NoOfUnits4: this.createNewBusinessPermitFormGroup.controls['numberofunits4'].value,
      Capitalization4: this.createNewBusinessPermitFormGroup.controls['capitalization4'].value,
      Essential4: this.createNewBusinessPermitFormGroup.controls['essential4'].value,
      NonEssential4: this.createNewBusinessPermitFormGroup.controls['nonessential4'].value,
      LineOfBusiness5: this.createNewBusinessPermitFormGroup.controls['lineofbusiness5'].value,
      NoOfUnits5: this.createNewBusinessPermitFormGroup.controls['numberofunits5'].value,
      Capitalization5: this.createNewBusinessPermitFormGroup.controls['capitalization5'].value,
      Essential5: this.createNewBusinessPermitFormGroup.controls['essential5'].value,
      NonEssential5: this.createNewBusinessPermitFormGroup.controls['nonessential5'].value,
    }
  ]
    return businessActivityObjects
  }
  async otherInformation()
  {
    var otherInformationObjects = await 
    [
    {
      BusinessAddress: '',
      BusinessPostalCode: '',
      BusinessTelephoneNumber: '',
      BusinessEmailAddress: '',
      BusinessMobileNumber: '',
      OwnersAddress: '',
      OwnersPostalCode: '',
      OwnersTelephoneNumber: '',
      OwnersEmailAddress: '',
      OwnersMobileNumber: '',
      IncaseOfEmergencyContactPerson: '',
      IncaseOfEmergencyPhoneorMobileNumber: '',
      IncaseOfEmergencyEmailAddress: '',
      BusinessAreaInSqm: '',
      TotalNoOfEmployeesMale: '',
      TotalNoOfEmployeesFemale: '',
      NumberOfEmployeesResidingLGU: '',
      LessorsFullname: '',
      LessorsAddress: '',
      LessorsTelephoneMobileNumber: '',
      LessorsEmailAddress: '',
      LessorsMonthlyRental: '',
      GrossSalesReceipts: ''
    }
  ]
    return otherInformationObjects
  }

  async createBusinessPermitFunction()
  {
    var Id
    if (localStorage.getItem('user') != null || localStorage.getItem('user') != undefined || localStorage.getItem('user'))
    {
      Id = JSON.parse(localStorage.getItem('user') as any)
    }
    var objectData = 
    await {
      DateCreated: moment(new Date()).format("MM-DD-YYYY HH:mm"),
      DateApproved: "NONE", 
      UserId: Id.id, 
      Type: "Renew",
      Status: "Pending",
      ApplicantSignature: this.signaturePad.toDataURL(),
    }
    
    await this.authService.createBusinessPermitForNew(objectData).subscribe(async data => 
      {
          console.log("response from sql", data)
          if(data.success == 1)
          {
            await this.createLineofBusinessFunction(data.data.insertId)
            await this.createAmendment(data.data.insertId)
            await this.createBasicInformation(data.data.insertId)
            await this.createOtherInformation(data.data.insertId)
            setTimeout(() => {
            this.spinner.hide()
            this.alertService.success("Created business permit for renewal successfully!");
            this.createNewBusinessPermitFormGroup.reset();
            this.clearSignature()
          }, 4000);
          }
          else 
          {
            setTimeout(() => {
              this.spinner.hide()
              this.alertService.danger(data.message);
            }, 4000);
          }
      })
  }

  async createLineofBusinessFunction(businesspermitId: any)
  {
    var businessActivityArray = 
[
  {
    LineOfBusiness: this.createNewBusinessPermitFormGroup.controls['lineofbusiness'].value,
    NoOfUnits: this.createNewBusinessPermitFormGroup.controls['numberofunits'].value,
    Capitalization:  this.createNewBusinessPermitFormGroup.controls['capitalization'].value,
    Essential: this.createNewBusinessPermitFormGroup.controls['essential'].value,
    NonEssential: this.createNewBusinessPermitFormGroup.controls['nonessential'].value,
    businesspermitid: businesspermitId
  },
  {
    LineOfBusiness: this.createNewBusinessPermitFormGroup.controls['lineofbusiness2'].value,
    NoOfUnits: this.createNewBusinessPermitFormGroup.controls['numberofunits2'].value,
    Capitalization:  this.createNewBusinessPermitFormGroup.controls['capitalization2'].value,
    Essential: this.createNewBusinessPermitFormGroup.controls['essential2'].value,
    NonEssential: this.createNewBusinessPermitFormGroup.controls['nonessential2'].value,
    businesspermitid: businesspermitId
  },
  {
    LineOfBusiness: this.createNewBusinessPermitFormGroup.controls['lineofbusiness3'].value,
    NoOfUnits: this.createNewBusinessPermitFormGroup.controls['numberofunits3'].value,
    Capitalization:  this.createNewBusinessPermitFormGroup.controls['capitalization3'].value,
    Essential: this.createNewBusinessPermitFormGroup.controls['essential3'].value,
    NonEssential: this.createNewBusinessPermitFormGroup.controls['nonessential3'].value,
    businesspermitid: businesspermitId
  },
  {
    LineOfBusiness: this.createNewBusinessPermitFormGroup.controls['lineofbusiness4'].value,
    NoOfUnits: this.createNewBusinessPermitFormGroup.controls['numberofunits4'].value,
    Capitalization:  this.createNewBusinessPermitFormGroup.controls['capitalization4'].value,
    Essential: this.createNewBusinessPermitFormGroup.controls['essential4'].value,
    NonEssential: this.createNewBusinessPermitFormGroup.controls['nonessential4'].value,
    businesspermitid: businesspermitId
  },
  {
    LineOfBusiness: this.createNewBusinessPermitFormGroup.controls['lineofbusiness5'].value,
    NoOfUnits: this.createNewBusinessPermitFormGroup.controls['numberofunits5'].value,
    Capitalization:  this.createNewBusinessPermitFormGroup.controls['capitalization5'].value,
    Essential: this.createNewBusinessPermitFormGroup.controls['essential5'].value,
    NonEssential: this.createNewBusinessPermitFormGroup.controls['nonessential5'].value,
    businesspermitid: businesspermitId
  },
]

businessActivityArray = businessActivityArray.filter(f => f.LineOfBusiness != ''
&& f.NoOfUnits != '' && f.Capitalization != ''
&& f.Essential != '' && f.NonEssential != '')
await businessActivityArray.forEach(fe => 
  {
    this.authService.createLineofBusinessForNew(fe).subscribe(data =>
      {
        console.log("line of business", data)
      })   
  })
 
  }

  async createAmendment(businesspermitId: any)
  {
    var amendMentObjects = await 
    
    {
      Mula: this.createNewBusinessPermitFormGroup.controls['from'].value,
      Hanggang: this.createNewBusinessPermitFormGroup.controls['to'].value,
      BusinessPermitId: businesspermitId
    }
  
    await this.authService.createAmendment(amendMentObjects).subscribe(Data => {
      console.log("Amendment data", Data)
    })
  }
  async createBasicInformation(businesspermitId: any)
  {

    var object = await 
    {
      BusinessPermitId: businesspermitId,
      ModeOfPayment: this.createNewBusinessPermitFormGroup.controls['modeofpayment'].value,
      DateOfApplication: this.createNewBusinessPermitFormGroup.controls['dateofapplication'].value,
      TinNo: this.createNewBusinessPermitFormGroup.controls['tinno'].value,
      DtiSecCdaRegistrationNumber: this.createNewBusinessPermitFormGroup.controls['dtiseccdaregistrationnumber'].value,
      DtiSecCdaRegistrationDate: this.createNewBusinessPermitFormGroup.controls['dtiseccdaregistrationdate'].value,
      TypeOfBusiness: this.createNewBusinessPermitFormGroup.controls['typeofbusiness'].value,
      TaxIncentiveGovernmentEntity: this.createNewBusinessPermitFormGroup.controls['taxincentivegovernmententity'].value,
      SpecifyEntity: this.createNewBusinessPermitFormGroup.controls['specifytheentity'].value,
      TaxPayerLastName: this.createNewBusinessPermitFormGroup.controls['taxpayerlastname'].value,
      TaxPayerFirstName: this.createNewBusinessPermitFormGroup.controls['taxpayerfirstname'].value,
      TaxPayerMiddleName: this.createNewBusinessPermitFormGroup.controls['taxpayermiddlename'].value,
      TaxPayerBusinessName: this.createNewBusinessPermitFormGroup.controls['taxpayerbusinessname'].value,
      TradeNameFranchise: this.createNewBusinessPermitFormGroup.controls['tradenamefranchise'].value,
    }
    console.log("bobo", object)

    await this.authService.createBasicInformation(object).subscribe(data => 
      {
        console.log("basic information data", data)
      })
  }
  async createOtherInformation(businesspermitId: any)
  {
    var obj = 
    await {
      BusinessAddress: this.createNewBusinessPermitFormGroup.controls['businessaddress'].value,
      BusinessPostalCode: this.createNewBusinessPermitFormGroup.controls['businesspostalcode'].value,
      BusinessTelephoneNumber: this.createNewBusinessPermitFormGroup.controls['businesstelephone'].value,
      BusinessEmailAddress: this.createNewBusinessPermitFormGroup.controls['businessemailaddress'].value,
      BusinessMobileNumber: this.createNewBusinessPermitFormGroup.controls['businessmobile'].value,
      OwnersAddress: this.createNewBusinessPermitFormGroup.controls['ownersaddress'].value,
      OwnersPostalCode: this.createNewBusinessPermitFormGroup.controls['ownerspostalcode'].value,
      OwnersTelephoneNumber: this.createNewBusinessPermitFormGroup.controls['ownerstelephone'].value,
      OwnersEmailAddress: this.createNewBusinessPermitFormGroup.controls['ownersemailaddress'].value,
      OwnersMobileNumber: this.createNewBusinessPermitFormGroup.controls['ownersmobile'].value,
      IncaseOfEmergencyContactPerson: this.createNewBusinessPermitFormGroup.controls['incaseofemergencyperson'].value,
      IncaseOfEmergencyPhoneorMobileNumber: this.createNewBusinessPermitFormGroup.controls['incaseofemergencypersontelephonenumber'].value,
      IncaseOfEmergencyEmailAddress: this.createNewBusinessPermitFormGroup.controls['incaseofemergencypersonemail'].value,
      BusinessAreaInSqm: this.createNewBusinessPermitFormGroup.controls['incaseofemergencypersonbusinessarea'].value,
      TotalNoOfEmployeesMale: this.createNewBusinessPermitFormGroup.controls['totalnumberofmale'].value,
      TotalNoOfEmployeesFemale: this.createNewBusinessPermitFormGroup.controls['totalnumberoffemale'].value,
      NumberOfEmployeesResidingLGU: this.createNewBusinessPermitFormGroup.controls['numberofemployeeslgu'].value,
      LessorsFullname: this.createNewBusinessPermitFormGroup.controls['lessorsfullname'].value,
      LessorsAddress: this.createNewBusinessPermitFormGroup.controls['lessorsaddress'].value,
      LessorsTelephoneMobileNumber: this.createNewBusinessPermitFormGroup.controls['lessorstelorphone'].value,
      LessorsEmailAddress: this.createNewBusinessPermitFormGroup.controls['lessorsemail'].value,
      LessorsMonthlyRental: this.createNewBusinessPermitFormGroup.controls['monthlyrental'].value,
      GrossSalesReceipts: this.createNewBusinessPermitFormGroup.controls['grossreceipt'].value,
      BusinessPermitId: businesspermitId,
    }

    await this.authService.createOtherInformation(obj).subscribe(Data => 
      {
        console.log("other information data", Data)
      })
  }
}
