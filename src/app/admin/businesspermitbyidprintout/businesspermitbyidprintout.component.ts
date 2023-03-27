import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-businesspermitbyidprintout',
  templateUrl: './businesspermitbyidprintout.component.html',
  styleUrls: ['./businesspermitbyidprintout.component.scss']
})
export class BusinesspermitbyidprintoutComponent implements OnInit {
public OccupancyYescheckbox: boolean = false 
public OccupancyNocheckbox: boolean = false
public OccupancyNotNeededcheckbox: boolean = false 

public BarangayYescheckbox: boolean = false 
public BarangayNocheckbox: boolean = false
public BarangayNotNeededcheckbox: boolean = false 


public SanitaryYescheckbox: boolean = false 
public SanitaryNocheckbox: boolean = false
public SanitaryNotNeededcheckbox: boolean = false 


public ValidYescheckbox: boolean = false 
public ValidNocheckbox: boolean = false
public ValidNotNeededcheckbox: boolean = false 

public MunicipalYescheckbox: boolean = false 
public MunicipalNocheckbox: boolean = false
public MunicipalNotNeededcheckbox: boolean = false 

public LeaseYescheckbox: boolean = false 
public LeaseNocheckbox: boolean = false
public LeaseNotNeededcheckbox: boolean = false 


public GrossSalesFirstAmountDue: any
public GrossSalesPENALTYorSURCHARGE: any
public GrossSalesTotal: any


public TaxonDeliveryFirstAmountDue: any
public TaxonDeliveryPENALTYorSURCHARGE: any
public TaxonDeliveryTotal: any

public TaxonStorageFirstAmountDue: any
public TaxonStoragePENALTYorSURCHARGE: any
public TaxonStorageTotal: any

public TaxonSignboardFirstAmountDue: any
public TaxonSignboardPENALTYorSURCHARGE: any
public TaxonSignboardTotal: any

public MayorsPermitFirstAmountDue: any
public MayorsPermitPENALTYorSURCHARGE: any
public MayorsPermitTotal: any


public GarbageFeeFirstAmountDue: any
public GarbageFeePENALTYorSURCHARGE: any
public GarbageFeeTotal: any

public SanitaryPermitFirstAmountDue: any
public SanitaryPermitPENALTYorSURCHARGE: any
public SanitaryPermitTotal: any

public WeightsFeeFirstAmountDue: any
public WeightsFeePENALTYorSURCHARGE: any
public WeightsFeeTotal: any

public StorageSubstanceFirstAmountDue: any
public StorageSubstancePENALTYorSURCHARGE: any
public StorageSubstanceTotal: any

public TotalFeesLguFirstAmountDue: any
public TotalFeesLguPENALTYorSURCHARGE: any
public TotalFeesLguTotal: any

public FireSafetyFirstAmountDue: any
public FireSafetyPENALTYorSURCHARGE: any
public FireSafetyTotal: any

public isFinalizing: boolean = false
  constructor() { }

  ngOnInit(): void {

    // setTimeout(() => {
    //     this.finalize()
    // }, 40000);
  }

  finalize()
  {
    console.log("finalizing started")
  this.isFinalizing = true
  setTimeout(() => 
  {
    this.convetToPDF()
  }, 5000)    
  }
  public convetToPDF()
{
var data = document.getElementById('sample') as any;
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 //console.log("image height", imgHeight) - 341.2186805040771
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf.jsPDF('p', 'mm', 'legal'); // A4 size page of PDF
var position = 0;
// pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 353.2186805040771)
pdf.save('new-file.pdf'); // Generated PDF
});
}
}
