import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _headerService:HeaderService) { }

  public loginUser():void {
    this._headerService.isLoggedIn.next(true);
  }

  public logoutUser():void {
    this._headerService.isLoggedIn.next(false);
  }

}
