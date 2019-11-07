import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-impressum2',
  templateUrl: './impressum2.component.html',
  styleUrls: ['./impressum2.component.scss']
})
export class Impressum2Component implements OnInit {
  private today = new Date();
  locale: string;

  lastUpdatedAt = new Date(2019, 5, 3, 10, 10, 10);
  days =
    (this.today.getTime() - this.lastUpdatedAt.getTime()) /
    (1000 * 60 * 60 * 24);
  user = {
    name: 'Homer Simpsons'
  };

  fromCode$ = this.translate.onLangChange.pipe(
    tap(event => (this.locale = event.lang)),
    switchMap(() => this.translate.get('impressum.title'))
  );

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.locale = this.translate.currentLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
