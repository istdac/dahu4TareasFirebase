import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  //Firestore es un servicio, entonces en constructor
  constructor(private firestore: AngularFirestore) {
    this.students = [
      {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      }, 
      {
        controlnumber: "12400391",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "iarjona2@ittepic.edu.mx",
        name: "Israel Arjona Castañeda",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "iarjona3@ittepic.edu.mx",
        name: "Israel Arjona Méndez",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents(): Observable<Student[]>{
    //Conexión a firestore y return
    return this.firestore.collection('students') //Obtner conexion
      .snapshotChanges() //Obtener snapshot con datos observables y si hay cambios se vuelve a ejecutar. Hace que no tengamos que refrescar la página
      .pipe( //Pipe da el formato para nuestros datos que obtenemos
        map(actions=> {
          return actions.map(a=>{ //a es un objeto que contiene el payload que tiene un doc, el cual tiene data que nos trae la información
            //Firestore separa datos de id
            const data = a.payload.doc.data() as Student;
            const id = a.payload.doc.id;
            //Formato
            return {id, ...data};
          });
        })
      );
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }

  public newStudent(student: Student) {
    //this.students.push(student);
    //return this.students;
    this.firestore.collection('students').add(student);
  }

}
