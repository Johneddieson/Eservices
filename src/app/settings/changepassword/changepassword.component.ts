import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var window: any;
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  public confirmshowPassword: string = 'fa fa-eye'
  public confirmpasswordType: string = 'password'

  public oldshowPassword: string = 'fa fa-eye'
  public oldpasswordType: string = 'password'

  public newshowPassword: string = 'fa fa-eye'
  public newpasswordType: string = 'password'
  public changepasswordFormGroup: FormGroup;
  public errMsg: string = ''
  public oldpassworderrMsg: string = ''
  public newpassworderrMsg: string = ''
  public validationMessageObject: object = {}
  public isValid: boolean = false
  public incorrectOldPasswordMessage: string = ''
  formModal: any;
  modalIncorrectOldPassword: any
  public userEmail: string = ''
  modalUpdatedPassworSuccessfully: any
  constructor(private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private router: Router) 
  {

    this.changepasswordFormGroup = this.formBuilder.group
    ({
      oldpassword: 
      [
        '',
        [
          Validators.required,
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
          this.oldpasswordaNumberPatternValid({pattern: /^([^0-9]*)$/, msg: 'A number' }),
          this.oldpasswordaLowerCasePatternValid({pattern: /^([^a-z]*)$/, msg: 'A lowercase' }),
          this.oldpasswordaUpperCasePatternValid({pattern: /^([^A-Z]*)$/, msg: 'A uppercase' }),
        ]
      ],
      newpassword: 
      [
        '',
        [
          Validators.required,
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
          this.newpasswordaNumberPatternValid({pattern: /^([^0-9]*)$/, msg: 'A number' }),
          this.newpasswordaLowerCasePatternValid({pattern: /^([^a-z]*)$/, msg: 'A lowercase' }),
          this.newpasswordaUpperCasePatternValid({pattern: /^([^A-Z]*)$/, msg: 'A uppercase' }),
        ]
      ],
      confirmpassword: 
      [
        ''
      ]
    })
   }


  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal
    (
      document.getElementById("exampleModal")
    )
    this.modalIncorrectOldPassword = new window.bootstrap.Modal
    (
      document.getElementById("apiErrorModal")
    )
    this.modalUpdatedPassworSuccessfully = new window.bootstrap.Modal
    (
      document.getElementById("apiSuccessModal")
    )
    const userToken = JSON.parse(localStorage.getItem('user') as any)

    this.getuserById(userToken.id)
  }
 //old password - if there is a number in value password validation
 oldpasswordthereisnumber: boolean = false
 oldpasswordaNumberPatternValid(config: any): ValidatorFn | any {
 return (control: FormControl) => {
   //console.log('wew', config);
   let urlRegeX: RegExp = config.pattern;
   if (control.value && !control.value.match(urlRegeX)) 
   {
     this.oldpasswordthereisnumber = true
     
   } else {
     this.oldpasswordthereisnumber = false
   }
 };
}

//old password - if there is an lowercase in value password validation
oldpasswordthereIsLowerCaseCharacters: boolean = false
oldpasswordaLowerCasePatternValid(config: any): ValidatorFn | any {
 return (control: FormControl) => {
   //console.log('wew', config);
   let urlRegeX: RegExp = config.pattern;
   if (control.value && !control.value.match(urlRegeX)) 
   {
     this.oldpasswordthereIsLowerCaseCharacters = true
     
   } else {
     this.oldpasswordthereIsLowerCaseCharacters = false
   }
 };
}

//old password - if there is an uppercase in value password validation
oldpasswordthereIsUpperCaseCharacters: boolean = false
oldpasswordaUpperCasePatternValid(config: any): ValidatorFn | any {
 return (control: FormControl) => {
   //console.log('wew', config);
   let urlRegeX: RegExp = config.pattern;
   if (control.value && !control.value.match(urlRegeX)) 
   {
     this.oldpasswordthereIsUpperCaseCharacters = true
     
   } else {
     this.oldpasswordthereIsUpperCaseCharacters = false
   }
 };
}

//old password - minimum of 8 character on password validation
oldpasswordminimum8Characters: boolean = false
oldpasswordaMinimum8CharactersPatternValid(config: any)
{
 const query = config.target.value;
 if (query.length >= 8)
  {
   this.oldpasswordminimum8Characters = true
  }
  else 
  {
   this.oldpasswordminimum8Characters = false
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

  async oldpasswordShowHide()
  {
    this.oldpasswordType = await this.oldpasswordType == 'password' ? 'text'  : 'password'
    this.oldshowPassword = await this.oldpasswordType == 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'
  }

  async confirmpasswordShowHide()
  {
    this.confirmpasswordType = await this.confirmpasswordType == 'password' ? 'text'  : 'password'
    this.confirmshowPassword = await this.confirmpasswordType == 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'
  }
  async newpasswordShowHide()
  {
    this.newpasswordType = await this.newpasswordType == 'password' ? 'text'  : 'password'
    this.newshowPassword = await this.newpasswordType == 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'
  }



  //new password - if there is a number in value password validation
  newpasswordthereisnumber: boolean = false
  newpasswordaNumberPatternValid(config: any): ValidatorFn | any {
 return (control: FormControl) => {
   //console.log('wew', config);
   let urlRegeX: RegExp = config.pattern;
   if (control.value && !control.value.match(urlRegeX)) 
   {
     this.newpasswordthereisnumber = true
     
   } else {
     this.newpasswordthereisnumber = false
   }
 };
}

//new password - if there is an lowercase in value password validation
newpasswordthereIsLowerCaseCharacters: boolean = false
newpasswordaLowerCasePatternValid(config: any): ValidatorFn | any {
 return (control: FormControl) => {
   //console.log('wew', config);
   let urlRegeX: RegExp = config.pattern;
   if (control.value && !control.value.match(urlRegeX)) 
   {
     this.newpasswordthereIsLowerCaseCharacters = true
     
   } else {
     this.newpasswordthereIsLowerCaseCharacters = false
   }
 };
}

//new password - if there is an uppercase in value password validation
newpasswordthereIsUpperCaseCharacters: boolean = false
newpasswordaUpperCasePatternValid(config: any): ValidatorFn | any {
 return (control: FormControl) => {
   //console.log('wew', config);
   let urlRegeX: RegExp = config.pattern;
   if (control.value && !control.value.match(urlRegeX)) 
   {
     this.newpasswordthereIsUpperCaseCharacters = true
     
   } else {
     this.newpasswordthereIsUpperCaseCharacters = false
   }
 };
}

//new password - minimum of 8 character on password validation
newpasswordminimum8Characters: boolean = false
newpasswordaMinimum8CharactersPatternValid(config: any)
{
 const query = config.target.value;
 if (query.length >= 8)
  {
   this.newpasswordminimum8Characters = true
  }
  else 
  {
   this.newpasswordminimum8Characters = false
  }
}

newpasswordAndconfirmpasswordIsMatched: boolean = true;
async newpasswordAndconfirmpasswordIsMatchedEvent(event: any)
{
  const query = event.target.value;
  if (this.changepasswordFormGroup.controls['newpassword'].value === query)
  {
    this.newpasswordAndconfirmpasswordIsMatched = true
  }
  else
   {
    this.newpasswordAndconfirmpasswordIsMatched = false
   }
  //this.changepasswordFormGroup.controls['newpassword'].value
}

validation() 
{
  var oldpasswordvalidationiserror =  this.changepasswordFormGroup.controls['oldpassword'].invalid
  var newpasswordvalidationiserror =  this.changepasswordFormGroup.controls['newpassword'].invalid
  var confirmpasswordvalidationiserror =  this.changepasswordFormGroup.controls['newpassword'].value !== 
  this.changepasswordFormGroup.controls['confirmpassword'].value ?  true : false

  if (oldpasswordvalidationiserror == true || 
    newpasswordvalidationiserror == true  ||
    confirmpasswordvalidationiserror == true)
    {
       this.errMsg = ''
       this.oldpassworderrMsg = ''
       this.newpassworderrMsg = ''
       this.isValid =  false
       this.oldpassworderrMsg += oldpasswordvalidationiserror === true ? "• Old password must be in the correct format\n" : ""
       this.newpassworderrMsg +=  newpasswordvalidationiserror === true ? "• New password must be in the correct format\n" : ""
       this.errMsg += confirmpasswordvalidationiserror === true ? "• Confirm password does not matched into your new password\n" : ""
    }
    else 
    {
          this.isValid =  true
          this.errMsg = ''
    }
this.validationMessageObject = {
isValid: this.isValid,
errMessage: this.errMsg
}
  return this.validationMessageObject
}

async updatePassword()
{
  var isvalid =  Object.assign(this.validation())
  if (isvalid.isValid == false)
  {
    await  this.formModal.show()
  } 
  else
  {
    //alert("password updated successfully!")
  this.updatePasswordApi()
  }
}

async getuserById(userid: any) {
  
  var obj = {
    id: userid,
  };
  await this.authService.getUsersById(obj).subscribe((data) => {
    //console.log('userid', data.data[0]);
    //email
    this.userEmail = data.data[0].email
  });
}
async updatePasswordApi()
{
  const userToken = JSON.parse(localStorage.getItem('user') as any)
  var obj = 
  {
    id: userToken.id,
    oldpassword: this.changepasswordFormGroup.controls['oldpassword'].value,
    newpassword: this.changepasswordFormGroup.controls['newpassword'].value,
  }
    await this.authService.changeUserPassword(obj)
    .subscribe(async data => 
      {
        if (data.success == 1)
        {
          this.incorrectOldPasswordMessage = ''
          await this.modalUpdatedPassworSuccessfully.show()
          this.incorrectOldPasswordMessage = data.message
        }
        else 
        {
          this.incorrectOldPasswordMessage = ''
        await this.modalIncorrectOldPassword.show()
        this.incorrectOldPasswordMessage = data.message
        }
      })
}

async closeModal()
{
  await this.modalUpdatedPassworSuccessfully.hide()

  this.spinner.show().then(() => {})

  setTimeout(() => {
      this.spinner.hide()
      localStorage.removeItem('user')
      this.router.navigateByUrl('/')
  }, 4000);
  
}
}
