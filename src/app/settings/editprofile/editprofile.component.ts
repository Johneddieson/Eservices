import { ApplicationRef, Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
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
  public currentOccupation: string = ''
  public userIdGlobalVariable: string = ''
  public userRole: string = ''
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService,
    private router: Router,  private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private alertService: AlertService) {
      // form validations
    this.aFormGroup = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
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
   async signup() {
    if (this.aFormGroup.controls['email'].value !== this.confirmEmail) {
      this.asterisk =
        (this.aFormGroup.controls['city'].value === 'Others' &&
          this.city == '') ||
        (this.isWorkingTugue == 'yes' && this.occupation == '')
          ? false
          : true;

      this.emailNotMatch = false;
          window.scrollTo(0, 0);
    } 
    else if (this.isWorkingTugue == 'yes' && this.occupation == '') 
    {
      this.asterisk =
        (this.aFormGroup.controls['city'].value === 'Others' &&
          this.city == '') ||
        (this.isWorkingTugue == 'yes' && this.occupation == '')
          ? false
          : true;
      this.emailNotMatch =
        this.aFormGroup.controls['email'].value !== this.confirmEmail
          ? false
          : true;
          window.scrollTo(0, 0);
    } 
    else 
    {
      if (
        this.aFormGroup.controls['city'].value === 'Others' &&
        this.city == ''
      ) 
      {
        this.asterisk = false;
        this.emailNotMatch =
          this.aFormGroup.controls['email'].value !== this.confirmEmail
            ? false
            : true;
            window.scrollTo(0, 0);
      } 
      else {
        this.emailNotMatch = true;
        this.asterisk = true;
        //await this.signupFunction()
        //alert("information updated successfully!")
        await this.editInformationApi()
      }
    }
  }
  //form controls
  get f() {
    //console.log(this.aFormGroup.controls)
    return this.aFormGroup.controls;
  }
  ngOnInit() {
    const userToken = JSON.parse(localStorage.getItem('user') as any)
    this.userIdGlobalVariable = userToken.id
    this.getuserById(userToken.id)
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
  aMinimum8CharactersPatternValid(config: any)
  {
    const query = config.target.value;
    if (query.length >= 8)
     {
      this.minimum8Characters = true
     }
     else 
     {
      this.minimum8Characters = false
     }
    // return (control: FormControl) => {
    //   let urlRegeX: RegExp = config.pattern;
      
    //  if (control.value.length >= 8)
    //  {
    //   this.minimum8Characters = true
    //  }
    //  else 
    //  {
    //   this.minimum8Characters = false
    //  }
    // };
  }


  //(if lives in alcala the barangay should be select option else input field) function condition
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


  async signupFunction()
  {
  var object = {
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
    workingInAlcala: this.isWorkingTugue,
    occupation: this.occupation === '' ? '' : this.occupation,
    businesspermitlength: 0,
    password: this.aFormGroup.controls['password'].value,
    role: "citizen"
  }; 
 
    await this.authService.register(object).subscribe(data => 
      {
        //console.log("Register user response", data)
        if (data.success == 1)
        {
          var idObj = 
          {
            id: parseInt(data.data.insertId),
            displayName: object.role
          }
          
            this.hideRegisterandCancelButton =  true
            this.showLoading = true;
           
            setTimeout(() => {
              this.showLoading = false
              this.showSuccessMessage = true
            }, 3000);
            
            setTimeout(() => {
              this.showSuccessMessage = false
              this.aFormGroup.reset()
              localStorage.setItem('user', JSON.stringify(idObj));
              this.router.navigateByUrl('home');
              this.hideRegisterandCancelButton = false
            }, 5000);
        }
        else 
        {

        }
      })
  }
  async getuserById(userid: any) {
  
    var obj = {
      id: userid,
    };
    await this.authService.getUsersById(obj).subscribe((data) => {
      //console.log('userid', data.data[0]);
      this.userRole = data.data[0].role
     // this.userEmail = data.data[0].email
     this.aFormGroup.controls['firstname'].setValue(data.data[0].firstname)
     this.aFormGroup.controls['lastname'].setValue(data.data[0].lastname)
     this.middlename = data.data[0].middlename
     this.suffix = data.data[0].suffix
     this.aFormGroup.controls['birthdate'].setValue(data.data[0].birthdate)
     this.aFormGroup.controls['sex'].setValue(data.data[0].sex)
     this.aFormGroup.controls['email'].setValue(data.data[0].email)
     this.confirmEmail = data.data[0].email
     this.aFormGroup.controls['phonenumber'].setValue(data.data[0].number)
      if (data.data[0].city != 'Alcala' && data.data[0].city != 'Others')
      {
        this.aFormGroup.controls['city'].setValue('Others')
            this.city = data.data[0].city
            this.isTugegaraoCity = false
      }
      else 
      {
        this.aFormGroup.controls['city'].setValue(data.data[0].city)
        this.isTugegaraoCity = true
      }
      this.housenumber = data.data[0].housenumber
      this.aFormGroup.controls['street'].setValue(data.data[0].street)

      if (data.data[0].city == 'Alcala')
      {
        this.aFormGroup.controls['barangaydropdown'].setValue(data.data[0].barangay)
        this.isTugegaraoCity = true
      }
      else 
      {
        this.aFormGroup.controls['barangaydropdown'].setValue(data.data[0].barangay)      
    this.isTugegaraoCity = false
      }

      this.isWorkingTugue = data.data[0].workingInAlcala
      this.occupation =  data.data[0].occupation
      this.currentOccupation = data.data[0].occupation
    });
  }


  async removeOccupationValue(event: any)
  {
    
    const query = event.target.value;
    //console.log("Dambel", this.currentOccupation)
    //console.log("occup", query)
    if (query == 'yes')
    {
      this.occupation = this.currentOccupation
    }
    else 
    {

      this.occupation = ''
    }
  }

  async editInformationApi()
  {
    var obj = 
    {
      firstname: this.aFormGroup.controls['firstname'].value,
      lastname: this.aFormGroup.controls['lastname'].value,
      middlename: this.middlename,
      suffix:  this.suffix,
      birthdate: this.aFormGroup.controls['birthdate'].value,
      sex: this.aFormGroup.controls['sex'].value,
      email: this.aFormGroup.controls['email'].value,
      number: this.aFormGroup.controls['phonenumber'].value,
      city: this.aFormGroup.controls['city'].value == 'Others' ? this.city : this.aFormGroup.controls['city'].value,
      housenumber: this.housenumber,
      street: this.aFormGroup.controls['street'].value,
      barangay: this.aFormGroup.controls['barangaydropdown'].value,
      workingInAlcala: this.isWorkingTugue,
      occupation: this.occupation,
      id: this.userIdGlobalVariable,
    }
    await this.authService.updateProfileInformation(obj)
    .subscribe(data => 
      {
          if (data.success == 1)
          {
            this.alertService.success(data.message);
          }
          else 
          {
            this.alertService.danger(data.message);
          }
      })
  }

  async goBackToMainPage()
  {
    if (this.userRole == 'citizen')
    {
        this.router.navigateByUrl('/home')
    }
    else 
    {
      this.router.navigateByUrl('/adminhome')
    }
  }
}
