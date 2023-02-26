import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'
import { NgxSpinnerService } from 'ngx-spinner';

interface Country {
	id?: number;
	applicantName: string;
	applicantEmail: string;
	taxpayerFullname: string;
	businessName: string;
  tradeName: string;
  date: string;
  status: string;
}

const COUNTRIES: Country[] = [
	{
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
	
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},{
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
  {
		applicantName: 'Eddieson Vergara',
		applicantEmail: 'vergaraeddieson@gmail.com',
		taxpayerFullname: 'Edgardo Luis Vergara',
		businessName: 'Real Estate Broker',
    tradeName: 'Real Estate Broker',
    date: '2023-02-26',
    status: 'Pending'
	},
];

@Component({
  selector: 'app-businesspermitlist',
  templateUrl: './businesspermitlist.component.html',
  styleUrls: ['./businesspermitlist.component.scss']
})
export class BusinesspermitlistComponent implements OnInit {
dateToday: string = ''
page = 1;
pageSize = 20;
collectionSize = 0;
countries: any[] = [];

datefromfilter: string = ''
datetofilter: string = ''
applicantfullnamefilter: string = ''
applicantemailfilter: string = ''
taxpayerfullnamefilter: string = ''
businessnamefilter: string = ''
typefilter: string = ''
statusfilter: string = ''

dateTodayCheckBox: boolean = false 
applicantFullnameCheckBox: boolean = false
applicantEmailCheckBox: boolean = false
taxpayerFullnameCheckBox: boolean = false
businessNameCheckBox: boolean = false
businessPermitTypeCheckBox: boolean = false
statusCheckBox: boolean = false
constructor(private authService: AuthServiceService,
	private spinner: NgxSpinnerService,
	private router: Router) 
  {
    this.refreshCountries();
   }

  ngOnInit(): void {
    var dateTodayConvertoMoment = moment(new Date()).format("YYYY-MM-DD");
    this.datefromfilter = dateTodayConvertoMoment
    this.datetofilter = dateTodayConvertoMoment
    // setInterval(async () => 
    // {
    //   var dateTodayConvertoMoment = moment(new Date()).format("YYYY-MM-DD");
    //   this.datefromfilter = dateTodayConvertoMoment
    //   this.datetofilter = dateTodayConvertoMoment
    //   this.dateToday = dateTodayConvertoMoment
    // }, 1000)
  }
  

  async refreshCountries() {
  
	this.spinner.show().then(() => 
	{

	})
    var objectToFilter = await 
    {
      datefromfilter:  moment(this.datefromfilter).format("MM-DD-YYYY"),
      datetofilter: moment(this.datetofilter).format("MM-DD-YYYY"),
      applicantfullnamefilter: this.applicantfullnamefilter,
      applicantemailfilter: this.applicantemailfilter,
      taxpayerfullnamefilter: this.taxpayerfullnamefilter,
      businessnamefilter: this.businessnamefilter,
      typefilter: this.typefilter,
      statusfilter: this.statusfilter,
      
      dateTodayCheckBox: this.dateTodayCheckBox, 
      applicantFullnameCheckBox: this.applicantFullnameCheckBox,
      applicantEmailCheckBox: this.applicantEmailCheckBox,
      taxpayerFullnameCheckBox: this.taxpayerFullnameCheckBox,
      businessNameCheckBox: this.businessNameCheckBox,
      businessPermitTypeCheckBox: this.businessPermitTypeCheckBox,
      statusCheckBox: this.statusCheckBox 
    
}
		this.authService.businesspermitlistfilter(objectToFilter).subscribe(data => 
      {
        console.log("business permit list", data.data)
        this.collectionSize = data.data.length
        this.countries = data.data.map((country: any, i: number) => ({ id: i + 1, ...country })).slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );

		setTimeout(() => {
			this.spinner.hide()
		}, 3000);
      })
	}

  async searchBusinessPermit()
  {
    await this.refreshCountries()
  }

  viewBusinessPermitApplication(country: any)
  {
	//businessPermitId
	console.log("view", country)
	this.router.navigateByUrl(`/businesspermit/${country.businessPermitId}`)
  }
}
