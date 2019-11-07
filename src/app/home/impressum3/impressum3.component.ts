import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-impressum3',
  templateUrl: './impressum3.component.html',
  styleUrls: ['./impressum3.component.scss']
})
export class Impressum3Component implements OnInit {
  private today = new Date();
  locale: string;

  lastUpdatedAt = new Date(2019, 10, 15, 10, 10, 10);
  days = Math.floor(
    (this.today.getTime() - this.lastUpdatedAt.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  user = {
    name: 'Homer Simpsons'
  };
  fromCode: string;
  fromCode$ = this.translocoService.langChanges$.pipe(
    tap(event => (this.locale = event)),
    map(() => this.translocoService.translate('impressum.title'))
  );

  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
    this.locale = this.translocoService.getActiveLang();
    // language file might not be loaded yet...
    this.fromCode = this.translocoService.translate('impressum.title');
  }

  useLanguage(language: string) {
    this.translocoService.setActiveLang(language);
  }
}
