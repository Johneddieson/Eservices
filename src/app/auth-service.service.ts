import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { Registerusermodel } from './interface/registerusermodel';

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
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //   } 
    // })
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

  


  //sql queries
login(objects: any): Observable<any>
{
  return this.http.post("https://alcala.onrender.com/users/login", objects);
}
register(userObject: any): Observable<any>
{
  return this.http.post("https://alcala.onrender.com/users/createuser", userObject);
}
getUserById(id: any): Observable<any>
{
  return this.http.get(`https://alcala.onrender.com/users/getuserById/${id}`)
}
createBusinessPermitForNew(object: any): Observable<any>
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/create`, object);
}
createLineofBusinessForNew(object: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/createlineofbusiness`, object);
}
createAmendment(object: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/createamendment`, object);
}
createBasicInformation(object: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/createbasicinformation`, object);
}
createOtherInformation(object: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/createotherinformation`, object);
}
totalPendings(): Observable<any> 
{
  return this.http.get(`https://alcala.onrender.com/businesspermit/totalpendings`);
}
businesspermitlist(): Observable<any> 
{
  return this.http.get(`https://alcala.onrender.com/businesspermit/businesspermitlist`);
}
businesspermitlistfilter(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/businesspermitlistfilter`, obj);
}
getBusinessPermitById(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/getBusinessPermitById`, obj);
}
getAmendmentByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/getAmendmentByBusinessPermitId`, obj);
}
getBasicInformationByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/getBasicInformationByBusinessPermitId`, obj);
}
getLineofBusinessByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/getLineofBusinessByBusinessPermitId`, obj);
}

getotherInformationByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/getotherInformationByBusinessPermitId`, obj);
}
updateBusinessPermitStatus(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/updateBusinessPermitStatus`, obj);
}

getUsersById(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/getUsersById`, obj);
}

updateUsersBusinessPermitlength(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/updateUsersBusinessPermitlength`, obj);
}

sendGridEmail(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/sendGridEmail`, obj);
}
changeUserPassword(obj: any): Observable<any>
{
  return this.http.post(`https://alcala.onrender.com/users/changeUserPassword`, obj)
}
updateProfileInformation(obj: any): Observable<any>
{
  return this.http.post(`https://alcala.onrender.com/users/updateProfileInformation`, obj)
}
updateBusinessPermitAppointmentSchedule(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/updateBusinessPermitAppointmentSchedule`, obj);
}
updateBusinessPermitDateApproved(obj: any): Observable<any> 
{
  return this.http.post(`https://alcala.onrender.com/businesspermit/updateBusinessPermitDateApproved`, obj);
}
}
