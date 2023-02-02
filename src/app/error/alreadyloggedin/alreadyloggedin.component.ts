import { ApplicationRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-alreadyloggedin',
  templateUrl: './alreadyloggedin.component.html',
  styleUrls: ['./alreadyloggedin.component.scss']
})
export class AlreadyloggedinComponent implements OnInit {

  @Input() item = ''
  @Input() redirect = ''
  constructor(

    private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone
  ) 
  
  {
    // this.router.events.subscribe(() => {
    //   this.zone.run(() => {
    //     setTimeout(() => {
    //       this.applicationRef.tick()
    //         var thesession = JSON.parse(localStorage.getItem('user') as any)
    //         console.log("the", thesession)
    //         if (thesession != null) {
    //           if (thesession.displayName == "admin") {
    //             this.continueas = 'Continue As Admin!'
    //           } 
    //           else {
    //             this.continueas = 'Continue As Citizen!'
    //           }
    //         } 
    //         else {
    //         }
           
    //     }, 0)
    //   })
    // })

   }

  ngOnInit(): void {
  }
  siteKey: string = '6LfklZgjAAAAAAXtisIMsHtmhMIVVJteLEoVx_yj';
}
