import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public afs: AngularFirestore,   // Inject Firestore service
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router,  
  public ngZone: NgZone,
  private http: HttpClient) {

     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
      } 
    })
   }

    // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)  
  }
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as any);
    return (user !== null) ? true : false;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    })
  }

  // getAllUsers(): Observable<any>
  // {
  //   return this.http.get("http://localhost:3000/api/users/getUser");
  // }
}
