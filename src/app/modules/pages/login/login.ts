import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "../../components/header/header";
import { FormGroup,FormBuilder,Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, Header,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
logiForm: FormGroup;

 constructor(private fb:FormBuilder){
  this.logiForm = this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(6)]]
  });
 }

 onSubmit(){
  if(this.logiForm.valid){
    console.log('login',this.logiForm.value);
    alert('login enviado');
  }
 }
}