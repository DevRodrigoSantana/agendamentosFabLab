import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-lab',
  imports: [CommonModule,RouterModule],
  templateUrl: './card-lab.html',
  styleUrl: './card-lab.scss'
})
export class CardLab {
  @Input() title?: string;
  @Input() local?: string;
  @Input() link?: string;
  @Input() img?: string

}
