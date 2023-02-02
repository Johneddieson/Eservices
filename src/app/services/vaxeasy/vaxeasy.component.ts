import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, OnChanges, SimpleChanges, ApplicationRef, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';
import { map } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vaxeasy',
  templateUrl: './vaxeasy.component.html',
  styleUrls: ['./vaxeasy.component.scss'],
})
export class VaxeasyComponent implements OnInit, OnChanges {
  public firstname: string = '';
  public middlename: string = '';
  public lastname: string = '';
  public suffix: string = '';
  public birthdate: string = '';
  public sex: string = '';
  public phonenumber: string = '';
  public province: string = 'Cagayan';
  public city: string = '';
  public housenumber: string = '';
  public street: string = '';
  public barangay: string = '';
  public workingorstudyingintugue: string = 'no';
  public workingtugue: boolean = false;
  public occupation: string = '';
  public occupationcity: string = '';
  public occupationprovince: string = '';
  public occupationunit: string = '';
  public occupationbarangay: string = '';
  public occupationstreet: string = '';
  public inp_ezconsult: string = 'wala';
  public haveEzconsult: boolean = false;
  public allergy: string = '';
  public comorbidity: string = '';
  public preferredavailability: string = '';
  public correctnumberformat: boolean = true;
  public correctinformation: boolean = false;
  public ezconsultnumber: string = '';
  public aFormGroup: FormGroup;
  public occupationempty: boolean = false
  public occupationunitempty: boolean = false
  public occupationstreetempty: boolean = false
  public occupationbarangayempty: boolean = false
  public ezconsultnumberempty: boolean = false
  public email: string = ''
  public userObject: any = ''
  public hideSubmitAndCancelButton: boolean = false
  public showLoading: boolean = false
  public showSuccessMessage: boolean = false
  constructor(
    private afauth: AngularFireAuth,
    private afstore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone
  ) 
  {
    this.afauth.authState.subscribe((user) => {
      if (user && user.uid) {
        this.afstore
          .doc(`users/${user.uid}`)
          .valueChanges()
          .subscribe((data) => {
            const userObject = data as any;
            this.userObject = data as any
            console.log('user object', userObject);
            this.firstname = userObject.firstname;
            this.middlename = userObject.middlename;
            this.lastname = userObject.lastname;
            this.suffix = userObject.suffix;
            this.birthdate = userObject.birthdate;
            this.sex = userObject.sex;
            this.phonenumber = userObject.number;
            this.city = userObject.city;
            this.housenumber = userObject.housenumber;
            this.street = userObject.street;
            this.barangay = userObject.barangay;
            this.workingorstudyingintugue = userObject.workingInTugue;
            this.occupation = userObject.occupation;
            this.email = userObject.email
            if (this.workingorstudyingintugue === 'no') {
              this.workingtugue = false;
              this.occupation = '';
              this.occupationunit = '';
              this.occupationbarangay = '';
              this.occupationstreet = '';
              this.occupationcity = '';
              this.occupationprovince = '';
              this.occupationempty = false
              this.occupationunitempty = false;
              this.occupationstreetempty = false;
              this.occupationbarangayempty = false
            } 
            else {
              this.workingtugue = true;
              this.occupationunit = '';
              this.occupationbarangay =  '';
              this.occupationstreet = '';
              this.occupationcity = 'Alcala';
              this.occupationprovince = 'Cagayan';
              this.occupationunitempty = true;
              this.occupationstreetempty = true;
              this.occupationbarangayempty = true
            }
            if (userObject.city != 'Alcala') 
                    {
                  this.router.navigateByUrl('/home')   
                    }
              // this.router.events.subscribe(() => {
              //   this.zone.run(() => {
              //     setTimeout(() => {
              //       if (userObject.city != 'Alcala') 
              //       {
              //     this.router.navigateByUrl('/home')   
              //       }   
              //     }, 0)
              //   })
              // })
            
          });
      }
   
   
      this.afstore.collection('VaxRegistration', ref => ref.where('email', '==', this.email))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        id: a.payload.doc.id,
        a.payload.doc.data() as any
      })))
      .subscribe(data => {
          console.log("count", data.length)
      })
    });
  
  
    this.aFormGroup = this.formBuilder.group({
      firstnamevalue: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
       lastnamevalue: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
       birthdatevalue: ['', [Validators.required]],
       sexvalue: ['', [Validators.required]],
      phonenumbervalue: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(09|63)[\d]{9}$/
          ),
        ],
      ],
       prioritygroup: ['', [Validators.required]],
       allergyvalue: ['', [Validators.required]],
       comorbidityvalue: ['', [Validators.required]],
       availability: ['', [Validators.required]],
       electronicform: [false, [Validators.requiredTrue]]
    })
  
  }

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ev(changes);
    this.ezconsult(changes);
    this.occupationnevent(changes);
    //this.occupationunitnevent(changes)
    this.occupationstreetnevent(changes)
    this.occupationbarangaynevent(changes);
    this.numbersOnly(changes)
    }

  ev(event: any) {
    if (this.workingorstudyingintugue === 'no') 
    {
      this.workingtugue = false;
      this.occupation = '';
      this.occupationunit = '';
      this.occupationbarangay = '';
      this.occupationstreet = '';
      this.occupationcity = '';
      this.occupationprovince = '';
      this.occupationempty = false
      this.occupationunitempty = false;
      this.occupationstreetempty = false;
      this.occupationbarangayempty = false
    } 
    else 
    {
      this.workingtugue = true;
      this.occupation = this.userObject.occupation;
      this.occupationunit = '';
      this.occupationbarangay = '';
      this.occupationstreet = '';
      this.occupationcity = 'Alcala';
      this.occupationprovince = 'Cagayan';
    }
    this.occupationnevent(event);
    //this.occupationunitnevent(event);
    this.occupationstreetnevent(event)
    this.occupationbarangaynevent(event)
    }

  ezconsult(event: any) {
    this.ezconsultnumber = '';
    if (this.inp_ezconsult === 'wala') {
      this.haveEzconsult = false;
      this.ezconsultnumberempty = false
    } else {
      this.haveEzconsult = true;
    }
    this.numbersOnly(event)
  }
  onKeypressEvent(event: any) {
    var regex =
      /(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/;
    var regexmatch = event.target.value;
    if (regexmatch.match(regex)) {
      this.correctnumberformat = true;
    } else {
      this.correctnumberformat = false;
    }
  }
  phonenumberformatchanges(event: any) {
    var regex =
      /(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/;
    var regexmatch = event.target.value;
    if (regexmatch.match(regex)) {
      this.correctnumberformat = true;
    } else {
      this.correctnumberformat = false;
    }
  }

  numbersOnly(event: any) {
    this.ezconsultnumber = this.ezconsultnumber.replace(/[^0-9.-]/g, '');

    if(this.inp_ezconsult === 'oo')
    {
      if (this.ezconsultnumber === '')
      {
          this.ezconsultnumberempty = true
      } else 
      {
        this.ezconsultnumberempty = false
      }
    }
  }
  public consultnumberEmpty: boolean = false
  public error: boolean = false
  public consultnumberIncorrectFormat: boolean = false
  public underage: boolean = false
  public underageMessage: boolean = false
  submit() {
    var mybirthdate = moment(this.aFormGroup.controls['birthdatevalue'].value).format('YYYY-MM-DD')
    var currentage = moment().diff(mybirthdate, 'years')
    let uniqueId = Math.random().toString(36).replace(".", "");
    var referenceNumber = uniqueId.slice(0, 14).toUpperCase()
  
    if (this.workingorstudyingintugue === 'yes' && this.inp_ezconsult === "oo")
    {
      if (this.occupation === ''  
      || this.occupationbarangay === '' || this.occupationstreet === ''
      || this.ezconsultnumber === '')
      {
        this.error = true
        
        this.underage = currentage > 5 ? false : true

          if (this.underage == true) 
          {
            this.underageMessage = true
          } else {
            this.underageMessage = false
          }
          window.scrollTo(0, 0);
        } 
      else 
      {      
        this.underage = currentage > 5 ? false : true
        this.error = false
        if (this.underage == true) {
            this.underageMessage = true
            window.scrollTo(0, 0);
        } 
        else 
        {  
          this.underageMessage = false
          this.savedInformation()
        } 
      }
    }
    else if (this.workingorstudyingintugue === 'yes' && this.inp_ezconsult === "wala")
    {
      if (this.occupation === ''  
      || this.occupationbarangay === '' || this.occupationstreet === ''
      )
      {
        this.error = true
        this.underage = currentage > 5 ? false : true
        
        if (this.underage == true) 
        {
          this.underageMessage = true
        } else {
          this.underageMessage = false
        }
        window.scrollTo(0, 0);
      } 
      else 
      {
        this.underage = currentage > 5 ? false : true
        this.error = false
        if (this.underage == true) {
            this.underageMessage = true
            window.scrollTo(0, 0);
        } else 
        {
          this.savedInformation()  
          this.underageMessage = false
          // this.afstore.collection('VaxRegistration').add({    
          // })
        }  
      }
    }
    else if  (this.workingorstudyingintugue === 'no' && this.inp_ezconsult === "oo")
    {
      if (this.ezconsultnumber === '')
      {
        this.error = true
        this.underage = currentage > 5 ? false : true
      
        
        if (this.underage == true) 
        {
          this.underageMessage = true
        } else {
          this.underageMessage = false
        }
        window.scrollTo(0, 0);
      } 
      else 
      {
        this.underage = currentage > 5 ? false : true
        this.error = false
        if (this.underage == true) {
            this.underageMessage = true
            window.scrollTo(0, 0);
        } else 
        {
          this.savedInformation()  
          this.underageMessage = false
          // this.afstore.collection('VaxRegistration').add({    
          // })
        }  
      }
    }
     
    else 
    {
      this.underage = currentage > 5 ? false : true
        this.error = false
        if (this.underage == true) {
            this.underageMessage = true
            window.scrollTo(0, 0);
        } else 
        {
          this.underageMessage = false
          this.error = false
         
          this.savedInformation()
          // this.afstore.collection('VaxRegistration').add({    
          // })
        
        }
    }

}

savedInformation()  
{
  this.hideSubmitAndCancelButton = true;
  this.showLoading = true
  let uniqueId = Math.random().toString(36).replace(".", "");
  var referenceNumber = uniqueId.slice(0, 14).toUpperCase()

  this.afstore.collection('VaxRegistration').add({    
    referencenumber: referenceNumber,
    email: this.email,
    firstname: this.aFormGroup.controls['firstnamevalue'].value,
    middlename: this.middlename === '' ? '' : this.middlename,
    lastname:   this.aFormGroup.controls['lastnamevalue'].value,
    suffix: this.suffix === '' ? '' : this.suffix,
    birthdate: this.aFormGroup.controls['birthdatevalue'].value,
    sex: this.aFormGroup.controls['sexvalue'].value,
    phonenumber: this.aFormGroup.controls['phonenumbervalue'].value,
    province: this.province,
    city: this.city,
    housenumber: this.housenumber,
    street: this.street,
    barangay: this.barangay,
    workingorstudyingintugue: this.workingorstudyingintugue,
    occupation: this.workingorstudyingintugue == 'yes' ? this.occupation : '',
    occupationprovince: this.workingorstudyingintugue == 'yes' ? this.occupationprovince : '',
    occupationcity: this.workingorstudyingintugue == 'yes' ? this.occupationcity : '',
    occupationunit: this.workingorstudyingintugue == 'yes' ? this.occupationunit : '',
    occupationstreet: this.workingorstudyingintugue == 'yes' ? this.occupationstreet : '',
    occupationbarangay: this.workingorstudyingintugue == 'yes' ? this.occupationbarangay : '',
    prioritygroup: this.aFormGroup.controls['prioritygroup'].value,
    allergyvalue:  this.aFormGroup.controls['allergyvalue'].value,
    comorbidityvalue: this.aFormGroup.controls['comorbidityvalue'].value,
    availability: this.aFormGroup.controls['availability'].value,
    haveEzconsultAccount: this.inp_ezconsult,
    ezConsultNumber:   this.inp_ezconsult === 'oo' ? this.ezconsultnumber : '',
    postedDate: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
    status: 'Pending'  
    }).then(el => {
      setTimeout(() => {
        this.showLoading = false
        this.showSuccessMessage = true
      }, 4000);
    setTimeout(() => {
      this.showSuccessMessage = false
      this.hideSubmitAndCancelButton = false
    }, 7000);
    }).catch(err => {
      console.log("save failed", err)
    })
}

get f() {
  return this.aFormGroup.controls;
}

occupationnevent(event: any) 
{
  if (this.workingorstudyingintugue === 'yes') 
  {
    if (this.occupation === '')
    {
      this.occupationempty = true
    } 
    else
    {
      this.occupationempty = false
    }
  }
}
// occupationunitnevent(event: any) 
// {
//   if (this.workingorstudyingintugue === 'yes') 
//   {
//     if (this.occupationunit === '')
//     {
//       this.occupationunitempty = true
//     } 
//     else
//     {
//       this.occupationunitempty = false
//     }
//   }
// }
occupationstreetnevent($event: any) 
{
  if (this.workingorstudyingintugue === 'yes') 
  {
    if (this.occupationstreet === '')
    {
      this.occupationstreetempty = true
    } 
    else
    {
      this.occupationstreetempty = false
    }
  }
}
occupationbarangaynevent(event: any)
{
  if (this.workingorstudyingintugue === 'yes') 
  {
    if (this.occupationbarangay === '')
    {
      this.occupationbarangayempty = true
    } 
    else
    {
      this.occupationbarangayempty = false
    }
  }
}
}
