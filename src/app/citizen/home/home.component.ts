import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstname: string = ''
  lastname: string = ''
  city: string = ''
  public businesspermitlength: number = 0
  public theresnoAlreadyBusinessPermit: boolean = false
  constructor(private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private authService: AuthServiceService,
    private router: Router,
    private spinner: NgxSpinnerService) 
  {
    this.afauth.authState.subscribe(data => {
      if(data != null)
      {
        this.afstore.doc(`users/${data.uid}`).valueChanges()
        .subscribe(data => {
          var userobject = data as any
          this.firstname = userobject.firstname;
          this.lastname = userobject.lastname
          this.city = userobject.city
          this.businesspermitlength = userobject.businesspermitlength
          if (this.businesspermitlength == 0)
          {
            this.theresnoAlreadyBusinessPermit = true
          }
          else 
          {
            this.theresnoAlreadyBusinessPermit = false
          }
        })
        
      }
    })
  }

  ngOnInit(): void {
    // this.authService.getAllUsers().subscribe(data => 
    //   {
    //     console.log("users from sql", data)
    //   })
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
