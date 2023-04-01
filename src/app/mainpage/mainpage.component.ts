import { ApplicationRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import {NgxSpinnerService, NgxSpinner} from 'ngx-spinner'


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

public continueas: string = ''
public link: string = ''
public isnull: boolean = false
public email: string = ''
public password: string = ''
public hideLoginAndSignupButton: boolean = false;
public showErrorAlert: boolean = false
public imageError: string = ''
public errMsg: string = ''
  constructor( private router: Router,  private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService

    ) 
    {
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
                this.isnull = false
              } 
              else {
                this.isnull = true
              }
             
          }, 0)
        })
      })
     
    
        // this.afauth.authState.subscribe(data => {
        //   if (data != null)
        //   {
        //     this.afstore.doc(`users/${data.uid}`).valueChanges()
        // .subscribe(data => {
        //   var userobject = data as any
        //   var firstname = userobject.firstname
        // })
        //   }
        // })
    
    }

   ngOnInit(): void {
    // this.spinner.show().then(() => {

    //   setTimeout(() => {
    //     this.spinner.hide();
    //   }, 5000);
    // })
  }
//   login() 
//   {
//     this.showErrorAlert = true
//     this.spinner.show().then(() => {

//     })
// this.authService.SignIn(this.email, this.password).then(el => {
//   const user = {
//     displayName: el.user?.displayName,
//     uid: el.user?.uid,
//     email: el.user?.email
//   }  
//   this.showErrorAlert = true
  
//   setTimeout(() => {
//     if (user.displayName === 'admin') 
//     {
//       this.router.navigateByUrl('/adminhome')
//     } 
//     else 
//     {
//       this.router.navigateByUrl('/home')
//     }
//     this.spinner.hide()
//     localStorage.setItem('user', JSON.stringify(el.user));    
//   }, 3500);

// }).catch(err => {
//   this.showErrorAlert = false
//   if (err.code == 'auth/wrong-password')
//   {
//     this.imageError = 'https://cdn-icons-png.flaticon.com/512/2976/2976592.png'
//     this.errMsg = err.message
//   }
//   else if (err.code == 'auth/user-not-found')
//   {
//     this.imageError = 'https://cdn-icons-png.flaticon.com/512/1804/1804190.png'
//     this.errMsg = err.message
//   }
//   else if (err.code == 'auth/invalid-email')
//   {
//     this.imageError = 'https://cdn-icons-png.flaticon.com/512/5220/5220262.png'
//     this.errMsg = err.message
//   }
//   else 
//   {
//     this.imageError = ''
//     this.errMsg = ''
//   }
// })
//   }

  hideSpinnerIfError()
  {
    this.spinner.hide()
  }

  login()
  {
    var objects = 
    {
      email: this.email, 
      password: this.password
    }
    this.authService.login(objects).subscribe(data => 
      {

    this.spinner.show().then(() => {

    })
        //console.log("login results", data.success)
      
        if (data.success == 1)
        {
          var idObj = 
          {
            id: data.data.id,
            displayName: data.data.role
          }
     
  this.showErrorAlert = true
  setTimeout(() => {
    if (data.data.role == 'citizen')
    {
      this.router.navigateByUrl('/home')
   
    }
    else 
    {
      this.router.navigateByUrl('/adminhome')
    }
    this.spinner.hide()
    localStorage.setItem('user', JSON.stringify(idObj));    
  }, 3500);

        }
        else 
        {
            this.showErrorAlert = false
      this.imageError = 'https://cdn-icons-png.flaticon.com/512/2976/2976592.png'
      this.errMsg = data.message
  
        }
      })
  }

}
