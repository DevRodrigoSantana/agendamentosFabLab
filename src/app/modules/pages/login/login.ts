import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from "../../components/header/header";
import { FormGroup,FormBuilder,Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../service/auth';

@Component({
  standalone:true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, Header,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  
loginForm: FormGroup;



 constructor(private fb:FormBuilder,private authService: Auth, private router:Router){
  this.loginForm = this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(6)]]
  });
 }

 onSubmit(){
  if(this.loginForm.valid){

    const {email, password} = this.loginForm.value;
    
        this.authService.login(email,password).subscribe({
      next:() => {
        alert("Login realizado com sucesso");
        setTimeout(() => this.router.navigate(['/control-panel']), 0);
      },
      error: (err) => {
        alert('E-mail ou senha incorretos.')
      }
    });

  }else{
    alert('Preencha todos os campos corretamente.')
  }
 }
}