import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss'],
})
export class AdminhomeComponent implements OnInit {
  firstname: string = ''
  lastname: string = ''
  city: string = ''
  public businesspermitlength: number = 0
  public theresnoAlreadyBusinessPermit: boolean = false
  subJectRealtime = new Subject<any>()
  dataobject: object = {}
  private dataSub = new BehaviorSubject<object>(this.dataobject);
  public totalPendingLength : number = 0
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
  

    setInterval(async () => 
    {
      await this.totalPendings()
    }, 2000)
    
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
          this.city = data.data[0].city
        
          // if(data.data[0].businesspermitlength == 0)
          // {
          //   this.theresnoAlreadyBusinessPermit = true
          //   this.router.navigateByUrl('/home')
          // }
          // else 
          // {
          //   this.theresnoAlreadyBusinessPermit = false
          // }
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


  async totalPendings()
  {
    await this.authService.totalPendings().subscribe(data => 
      {
        //console.log("total pendings", data)
        if (data.success == 1)
        {
          this.totalPendingLength = data.data.status
        }
        else
        {
            alert(data.message);
        }
      })
  }

  async alertNavLink()
  {
    alert("tanga ka")
  }

  async changePassword()
  {
    await this.router.navigateByUrl('/changepassword')
  }
}
