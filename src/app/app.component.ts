import {
  Component,
  HostBinding,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fadeInAnimation } from './core/animations/fade-in-animation';
import { SettingsService } from './settings/settings.service';
import { HostElementService } from './shared/modal/host/host-element.service';

@Component({
  animations: [fadeInAnimation],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class')
  currentTheme = 'light';
  title = 'app';

  constructor(
    private settingsService: SettingsService,
    hostElementService: HostElementService,
    hostElement: ViewContainerRef,
    translate: TranslateService
  ) {
    hostElementService.setHost(hostElement);
    translate.setDefaultLang('en');
    translate.use('de');
  }

  ngOnInit() {
    this.settingsService.themeChanged$.subscribe(
      theme => (this.currentTheme = theme)
    );
  }

  // change the animation state
  getRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
