import { ApplicationRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

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
  constructor( private router: Router,  private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private authService: AuthServiceService,

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
     }

  ngOnInit(): void {
  }
  login() 
  {
this.authService.SignIn(this.email, this.password).then(el => {
  const user = {
    displayName: el.user?.displayName,
    uid: el.user?.uid,
    email: el.user?.email
  }  

  this.hideLoginAndSignupButton = true
  setTimeout(() => {
    if (user.displayName === 'admin') 
    {
      this.router.navigateByUrl('/adminhome')
    } 
    else 
    {
      this.router.navigateByUrl('/home')
    }
    this.hideLoginAndSignupButton = false
    localStorage.setItem('user', JSON.stringify(el.user));    
  }, 3500);

}).catch(err => {
  alert(err.message)
})
  }


}
