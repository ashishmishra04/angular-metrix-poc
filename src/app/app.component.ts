import {Component, Inject} from '@angular/core';
import {AuthService, IdToken, User} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$ = new BehaviorSubject<User| null>(null);
  idToken : IdToken | null | undefined = null;
  accessToken : any = null;
  constructor(public authService: AuthService,
              @Inject(DOCUMENT) private doc: Document) {
    this.authService.user$.subscribe((user) => {
      console.log('USER-UPDATED', user);
      this.idToken = null;
      this.accessToken = null;
      if (user) {
        this.user$.next(user);
        this.authService.idTokenClaims$.subscribe((token) => {
          console.log('TOKEN', token);
          this.idToken = token;
        });

        this.authService.getAccessTokenSilently({detailedResponse: true} )
          .subscribe((accessToken) => {
            console.log('ACCESS-TOKEN', accessToken);
            this.accessToken = accessToken;
          });

      } else {
        this.user$.next(null);
      }
    }
  );
  }
  onLogin() {
    this.authService.loginWithRedirect();
  }

  onLogout() {
    this.authService.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}
