import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstname: string = ''
  lastname: string = ''
  constructor(private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private authService: AuthServiceService,
    private router: Router) 
  {
    this.afauth.authState.subscribe(data => {
      if(data != null)
      {
        this.afstore.doc(`users/${data.uid}`).valueChanges()
        .subscribe(data => {
          var userobject = data as any
          this.firstname = userobject.firstname;
          this.lastname = userobject.lastname
        })
      }
    })
  }

  ngOnInit(): void {
    //console.log("Wew", JSON.parse(localStorage.getItem('user') as any))
  }
  logout() {
     this.authService.SignOut()
    localStorage.removeItem('user')
    //this.router.navigateByUrl('/')
  }

}
