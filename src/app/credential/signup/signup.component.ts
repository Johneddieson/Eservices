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
  public iserror: boolean = false
  public emailAlreadyInusedErrorMessage: string = ''
  public showLoading: boolean = false;
  public showSuccessMessage: boolean = false;
  public hideRegisterandCancelButton: boolean = false;
  public showPassword: string = 'fa fa-eye'
  public passwordType: string = 'password'
  public confirmshowPassword: string = 'fa fa-eye'
  public confirmpasswordType: string = 'password'
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService,
    private router: Router,  private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private applicationRef: ApplicationRef,
    private zone: NgZone) {
      // form validations
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', [Validators.required]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      birthdate: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(09|63)[\d]{9}$/
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
          this.aNumberPatternValid({pattern: /^([^0-9]*)$/, msg: 'A number' }),
          this.aLowerCasePatternValid({pattern: /^([^a-z]*)$/, msg: 'A lowercase' }),
          this.aUpperCasePatternValid({pattern: /^([^A-Z]*)$/, msg: 'A uppercase' }),
          this.aMinimum8CharactersPatternValid({pattern: 'Minimum 8 characters', msg: 'Minimum 8 characters' }),
          Validators.minLength(8)
        ],
      ],
      termsofuse: [false, [Validators.requiredTrue]],
      dataprivacypolicy: [false, [Validators.requiredTrue]],
    });

    
    // after logged in, if the user click the back browser button, this function will be invoked
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
//signup, saved to the database
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
            this.hideRegisterandCancelButton =  true
            this.showLoading = true;
           
            setTimeout(() => {
              this.showLoading = false
              this.showSuccessMessage = true
            }, 3000);
            
            setTimeout(() => {
              this.showSuccessMessage = false
              this.aFormGroup.reset()
              localStorage.setItem('user', JSON.stringify(el.user));
              this.router.navigateByUrl('home');
              this.hideRegisterandCancelButton = false
            }, 5000);
            
        }).catch(err => {
          //Error alert
            console.log("err", err);
            this.iserror = true
            this.emailAlreadyInusedErrorMessage = err.message
            window.scrollTo(0, 0);
        })
      }
    }
  }
  //form controls
  get f() {
    //console.log(this.aFormGroup.controls)
    return this.aFormGroup.controls;
  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  //check if the email and confirm email are the same event on confirm email input field
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
   //check if the email and confirm email are the same event on email input field
  compare2(event: any) {
    const query = event.target.value;
    // if (query !== this.aFormGroup.controls['email'].value) {
    //   this.isMatchEmail = false;
    // } else {
    //   this.isMatchEmail = this.isMatchEmail = true;
    // }

    this.isMatchEmail = query !== this.confirmEmail ? false : true;
  }

  //check if the password and confirm password are the same event on confirm password input field
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

  //check if the password and confirm password are the same event on password input field
  comparepassword2(event: any) {
    const query = event.target.value;
    // if (query !== this.aFormGroup.controls['password'].value) {
    // this.isMatchPassword = false;
    // } else {
    //   this.isMatchPassword = this.isMatchPassword = true;
    // }
    this.isMatchPassword = query !== this.confirmPassword ? false : true;
  }
  //captcha API Key
  siteKey: string = '6LfklZgjAAAAAAXtisIMsHtmhMIVVJteLEoVx_yj';
  
  //if there is a number in value password validation
  thereisnumber: boolean = false
    aNumberPatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      //console.log('wew', config);
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.thereisnumber = true
        
      } else {
        this.thereisnumber = false
      }
    };
  }

  //if there is an lowercase in value password validation
  thereIsLowerCaseCharacters: boolean = false
  aLowerCasePatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      //console.log('wew', config);
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.thereIsLowerCaseCharacters = true
        
      } else {
        this.thereIsLowerCaseCharacters = false
      }
    };
  }

  //if there is an uppercase in value password validation
  thereIsUpperCaseCharacters: boolean = false
  aUpperCasePatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      //console.log('wew', config);
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) 
      {
        this.thereIsUpperCaseCharacters = true
        
      } else {
        this.thereIsUpperCaseCharacters = false
      }
    };
  }

  //minimum of 8 character on password validation
  minimum8Characters: boolean = false
  aMinimum8CharactersPatternValid(config: any): ValidatorFn | any
  {
    return (control: FormControl) => {
      //console.log('wew', config);
      let urlRegeX: RegExp = config.pattern;
      
     if (control.value.length >= 8)
     {
      this.minimum8Characters = true
     }
     else 
     {
      this.minimum8Characters = false
     }
    };
  }


  //if lives in alcala the barangay should be select option else input field function condition
  istuguegaraocity(event: any) {
    const query = event.target.value.toLowerCase();
    if (query == 'alcala' || query == '') {
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

  //password eye function
  async password()
  {
    this.passwordType = await this.passwordType == 'text' ? 'password' : 'text'
    this.showPassword = await this.showPassword == 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye'
  }
  //confirm password eye function
  async conPassword()
  {
    this.confirmpasswordType = await this.confirmpasswordType == 'text' ? 'password' : 'text'
    this.confirmshowPassword = await this.confirmshowPassword == 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye'
  }
}
