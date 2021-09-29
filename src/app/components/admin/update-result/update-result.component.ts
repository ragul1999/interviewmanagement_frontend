import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result, ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.css']
})
export class UpdateResultComponent implements OnInit {
id:any;
result:Result={};
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private resultService:ResultService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.reloadResultData();
  }
reloadResultData(){
  this.resultService.getResultById(this.id).subscribe(data=>{
    this.result=data.data;
  },error=> window.alert(error.error.message));
  }

  updateResult(result:any){
    result.id=this.id;
    result.interview=this.result.interview;
    result.addedOn=this.result.addedOn;
    result.updatedBy=localStorage.getItem('adminEmail') as any as string;
    this.resultService.updateResult(result).subscribe(data=>{
      window.alert(data.message);
      this.router.navigate(['manageResult']);
    },error=> window.alert(error.error.message));
  }
}
