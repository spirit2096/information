import { Component } from '@angular/core';
import { PrimeNgModule } from '../../modules/prime-ng/prime-ng.module';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PrimeNgModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

}
