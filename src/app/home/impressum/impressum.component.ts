import { Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent {
  private today = new Date();

  lastUpdatedAt = new Date(2019, 5, 3, 10, 10, 10);
  days =
    (this.today.getTime() - this.lastUpdatedAt.getTime()) /
    (1000 * 60 * 60 * 24);
}
