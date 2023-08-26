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

  
public domain: string = 'http://localhost:3000'
public domainproduction: string = 'https://alcalaeservices.onrender.com'
  //sql queries
login(objects: any): Observable<any>
{
  return this.http.post(`${this.domainproduction}/users/login`, objects);
}
register(userObject: any): Observable<any>
{
  return this.http.post(`${this.domainproduction}/users/createuser`, userObject);
}
getUserById(id: any): Observable<any>
{
  return this.http.get(`${this.domainproduction}/users/getuserById/${id}`)
}
createBusinessPermitForNew(object: any): Observable<any>
{
  return this.http.post(`${this.domainproduction}/businesspermit/create`, object);
}
createLineofBusinessForNew(object: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/createlineofbusiness`, object);
}
createAmendment(object: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/createamendment`, object);
}
createBasicInformation(object: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/createbasicinformation`, object);
}
createOtherInformation(object: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/createotherinformation`, object);
}
totalPendings(): Observable<any> 
{
  return this.http.get(`${this.domainproduction}/businesspermit/totalpendings`);
}
businesspermitlist(): Observable<any> 
{
  return this.http.get(`${this.domainproduction}/businesspermit/businesspermitlist`);
}
businesspermitlistfilter(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/businesspermitlistfilter`, obj);
}
getBusinessPermitById(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/getBusinessPermitById`, obj);
}
getAmendmentByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/getAmendmentByBusinessPermitId`, obj);
}
getBasicInformationByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/getBasicInformationByBusinessPermitId`, obj);
}
getLineofBusinessByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/getLineofBusinessByBusinessPermitId`, obj);
}

getotherInformationByBusinessPermitId(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/getotherInformationByBusinessPermitId`, obj);
}
updateBusinessPermitStatus(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/updateBusinessPermitStatus`, obj);
}

getUsersById(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/getUsersById`, obj);
}

updateUsersBusinessPermitlength(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/updateUsersBusinessPermitlength`, obj);
}

sendGridEmail(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/sendGridEmail`, obj);
}
changeUserPassword(obj: any): Observable<any>
{
  return this.http.post(`${this.domainproduction}/users/changeUserPassword`, obj)
}
updateProfileInformation(obj: any): Observable<any>
{
  return this.http.post(`${this.domainproduction}/users/updateProfileInformation`, obj)
}
updateBusinessPermitAppointmentSchedule(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/updateBusinessPermitAppointmentSchedule`, obj);
}
updateBusinessPermitDateApproved(obj: any): Observable<any> 
{
  return this.http.post(`${this.domainproduction}/businesspermit/updateBusinessPermitDateApproved`, obj);
}
}
