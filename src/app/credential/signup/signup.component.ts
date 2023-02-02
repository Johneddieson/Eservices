import { Router, TitleStrategy } from '@angular/router';
import { ApplicationRef, Component, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnChanges {
  public confirmEmail: string = '';
  public emailNotMatch: boolean = true;
  public passwordNotMatch: boolean = true;
  public aFormGroup: FormGroup;
  isMatchEmail: boolean = true;
  public isTugegaraoCity: boolean = true;
  public city: string = '';
  public barangay: string = '';
  public isWorkingTugue: string = 'no';
  public confirmPassword: string = '';
  public asterisk: boolean = true;
  isMatchPassword: boolean = true;
  public occupation: string = '';
  public asterisk2: boolean = true;
  public middlename: string = ''
  public suffix: string = ''
  public housenumber: string = ''
  public hideregisterform: boolean = false
  public continueas: string = ''
  public link: string = ''
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService,
    private router: Router,  private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private applicationRef: ApplicationRef,
    private zone: NgZone) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', [Validators.required]],
      firstname: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
      birthdate: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/
          ),
        ],
      ],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      barangaydropdown: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
        ],
      ],
      termsofuse: [false, [Validators.requiredTrue]],
      dataprivacypolicy: [false, [Validators.requiredTrue]],
    });

    
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick()
            var thesession = JSON.parse(localStorage.getItem('user') as any)
            if (thesession != null) {
              if (thesession.displayName == "admin") {
                this.continueas = 'Continue As Admin!'
                this.link = '/adminhome'
              } 
              else {
                this.continueas = 'Continue As Citizen!'
                this.link = '/home'
              }
              this.hideregisterform = true
            } 
            else {
              this.hideregisterform = false
            }
           
        }, 0)
      })
    })
  }

  signup() {
    if (this.aFormGroup.controls['email'].value !== this.confirmEmail) {
      this.asterisk =
        (this.aFormGroup.controls['city'].value === 'Others' &&
          this.city == '') ||
        (this.isWorkingTugue == 'yes' && this.occupation == '')
          ? false
          : true;

      this.emailNotMatch = false;
      this.passwordNotMatch =
        this.aFormGroup.controls['password'].value !== this.confirmPassword
          ? false
          : true;
          window.scrollTo(0, 0);
    } else if (
      this.aFormGroup.controls['password'].value !== this.confirmPassword
    ) {
      this.asterisk =
        (this.aFormGroup.controls['city'].value === 'Others' &&
          this.city == '') ||
        (this.isWorkingTugue == 'yes' && this.occupation == '')
          ? false
          : true;
      this.passwordNotMatch = false;
      this.emailNotMatch =
        this.aFormGroup.controls['email'].value !== this.confirmEmail
          ? false
          : true;
          window.scrollTo(0, 0);
    } else if (this.isWorkingTugue == 'yes' && this.occupation == '') {
      this.asterisk =
        (this.aFormGroup.controls['city'].value === 'Others' &&
          this.city == '') ||
        (this.isWorkingTugue == 'yes' && this.occupation == '')
          ? false
          : true;
      this.passwordNotMatch =
        this.aFormGroup.controls['password'].value !== this.confirmPassword
          ? false
          : true;
      this.emailNotMatch =
        this.aFormGroup.controls['email'].value !== this.confirmEmail
          ? false
          : true;
          window.scrollTo(0, 0);
    } else {
      if (
        this.aFormGroup.controls['city'].value === 'Others' &&
        this.city == ''
      ) {
        // && (this.city == "" || this.city == undefined || this.city == null) || (this.barangay == "" || this.barangay == undefined || this.barangay == null)
        this.asterisk = false;
        this.passwordNotMatch =
          this.aFormGroup.controls['password'].value !== this.confirmPassword
            ? false
            : true;
        this.emailNotMatch =
          this.aFormGroup.controls['email'].value !== this.confirmEmail
            ? false
            : true;
            window.scrollTo(0, 0);
      } else {
        this.emailNotMatch = true;
        this.passwordNotMatch = true;
        this.asterisk = true;
        this.authService.SignUp
        (this.aFormGroup.controls['email'].value, this.aFormGroup.controls['password'].value)
        .then(el => {
          const user = {
            displayName: el.user?.displayName,
            uid: el.user?.uid,
            email: el.user?.email
          }  
          
          user.displayName = 'citizen'
          el.user?.updateProfile({
            displayName: 'citizen'
          }).then(el2 => {

          }).catch(err2 => {
            console.log("err update display name", err2)
          })
          localStorage.setItem('user', JSON.stringify(el.user));
        
          this.afstore.doc(`users/${el.user?.uid}`).set({
            uid: user.uid,
            firstname: this.aFormGroup.controls['firstname'].value,
            lastname: this.aFormGroup.controls['lastname'].value,
            middlename: this.middlename === '' ? '' : this.middlename,
            suffix: this.suffix === '' ? '' : this.suffix,
            birthdate: this.aFormGroup.controls['birthdate'].value,
            sex: this.aFormGroup.controls['sex'].value,
            email: this.aFormGroup.controls['email'].value,
            number: this.aFormGroup.controls['phonenumber'].value,
            city: this.aFormGroup.controls['city'].value === 'Others' ? this.city : this.aFormGroup.controls['city'].value,
            housenumber: this.housenumber === '' ? '' : this.housenumber,
            street: this.aFormGroup.controls['street'].value,
            barangay: this.aFormGroup.controls['barangaydropdown'].value,
            workingInTugue: this.isWorkingTugue,
            occupation: this.occupation === '' ? '' : this.occupation,
            
            //password: this.aFormGroup.controls['password'].value
          })
        
          this.router.navigateByUrl('home');
        }).catch(err => {
            console.log("err", err);
        })
      }
    }
  }
  get f() {
    return this.aFormGroup.controls;
  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('valid', changes);
  }
  compare(event: any) {
    const query = event.target.value;
    // if (query !== this.aFormGroup.controls['email'].value) {
    //   this.isMatchEmail = false;
    // } else {
    //   this.isMatchEmail = this.isMatchEmail = true;
    // }

    this.isMatchEmail =
      query !== this.aFormGroup.controls['email'].value ? false : true;
  }
  compare2(event: any) {
    const query = event.target.value;
    // if (query !== this.aFormGroup.controls['email'].value) {
    //   this.isMatchEmail = false;
    // } else {
    //   this.isMatchEmail = this.isMatchEmail = true;
    // }

    this.isMatchEmail = query !== this.confirmEmail ? false : true;
  }
  comparepassword(event: any) {
    const query = event.target.value;
    // if (query !== this.aFormGroup.controls['password'].value) {
    // this.isMatchPassword = false;
    // } else {
    //   this.isMatchPassword = this.isMatchPassword = true;
    // }
    this.isMatchPassword =
      query !== this.aFormGroup.controls['password'].value ? false : true;
  }

  comparepassword2(event: any) {
    const query = event.target.value;
    // if (query !== this.aFormGroup.controls['password'].value) {
    // this.isMatchPassword = false;
    // } else {
    //   this.isMatchPassword = this.isMatchPassword = true;
    // }
    this.isMatchPassword = query !== this.confirmPassword ? false : true;
  }
  siteKey: string = '6LfklZgjAAAAAAXtisIMsHtmhMIVVJteLEoVx_yj';

  customPatternValid(config: any): ValidatorFn | any {
    console.log('wew', config);
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) {
        return {
          invalidMsg: config.msg,
        };
      } else {
        return null;
      }
    };
  }

  istuguegaraocity(event: any) {
    const query = event.target.value.toLowerCase();
    if (query == 'tuguegarao city' || query == '') {
      this.isTugegaraoCity = true;

      this.aFormGroup.controls['barangaydropdown'].setValue('');
    } else {
      this.isTugegaraoCity = false;
      this.aFormGroup.controls['barangaydropdown'].setValue('');
    }
  }
  async isvalid() {
    var isval = await this.aFormGroup.valid;
    return isval;
  }
}
