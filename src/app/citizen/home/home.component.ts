import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  firstname: string = ''
  lastname: string = ''
  city: string = ''
  public businesspermitlength: number = 0
  public theresnoAlreadyBusinessPermit: boolean = false
  subJectRealtime = new Subject<any>()
  dataobject: object = {}
  private dataSub = new BehaviorSubject<object>(this.dataobject);
  constructor(private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService) 
  {
    // this.subJectRealtime.next(this.getUser())
    // this.afauth.authState.subscribe(data => {
    //   if(data != null)
    //   {
    //     this.afstore.doc(`users/${data.uid}`).valueChanges()
    //     .subscribe(data => {
    //       var userobject = data as any
    //       this.firstname = userobject.firstname;
    //       this.lastname = userobject.lastname
    //       this.city = userobject.city
    //       this.businesspermitlength = userobject.businesspermitlength
    //       if (this.businesspermitlength == 0)
    //       {
    //         this.theresnoAlreadyBusinessPermit = true
    //       }
    //       else 
    //       {
    //         this.theresnoAlreadyBusinessPermit = false
    //       }
    //     })
        
    //   }
    // })
  }

  ngOnInit(): void { 

    this.subJectRealtime.next(this.getUser())
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.subJectRealtime.next(this.getUser())
   
  }

async getUser()
{
  var userToken = localStorage.getItem('user')
  if (userToken != null || userToken || userToken != undefined)
  {
    var parseUserToken = JSON.parse(userToken);

    await this.authService.getUserById(parseUserToken.id).subscribe(data => 
      {
        //console.log("users from sql", data)
        if (data.success == 1)
        {
          this.firstname = data.data[0].firstname;
          this.lastname = data.data[0].lastname
          this.city = data.data.city
        }
      })
  }
}

  logout() {
     this.authService.SignOut()
    localStorage.removeItem('user')
    //this.router.navigateByUrl('/')
  }

  async goToVaxeasyPage() 
  {
    if (this.city != 'Alcala')
    {
      alert('Pasensiya na dahil hindi ka taga lungsod ng alcala para gamitin ang serbisyo na ito.')
    }
    else 
    {
      await this.router.navigateByUrl('/vaxeasy')
    }
  }
}
