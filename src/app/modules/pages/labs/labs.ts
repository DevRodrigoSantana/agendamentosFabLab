import { Component } from '@angular/core';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-labs',
  standalone: true, // necessário
  imports: [], // ou [] se não quiser header
  templateUrl: './labs.html',
  styleUrls: ['./labs.scss']
})
export class Labs {}
