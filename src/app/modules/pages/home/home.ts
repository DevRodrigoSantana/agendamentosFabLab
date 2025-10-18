import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // necessário
  imports: [Header,RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}
