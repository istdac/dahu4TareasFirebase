import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;
  public id: string;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.student={
      controlnumber: '',
      age: 0,
      career: '',
      curp: '',
      email: '',
      name: '',
      nip: 0,
      photo: ''
    };
  }

  ngOnInit() {
    // let cn;
    /*this.activatedRoute.queryParams.subscribe((params) => {
      this.student = this.studentService.getStudentByControlNumber(params.cn);
    });*/
    // console.log(cn);
    this.activatedRoute.queryParams.subscribe((params) => {
          this.studentService.getStudentById(params.id).subscribe(item=>{
            this.student = item as Student;
            this.id = params.id;
            console.log(this.id)
          });
    });
  }
  public editStudent(){
    this.router.navigate(['/edit-student'],{
      queryParams: {id:this.id}
    });
  }


}
