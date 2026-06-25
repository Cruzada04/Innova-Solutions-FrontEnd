import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/authenticate';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }, { observe: 'response' }).pipe(
      map((response: any) => {
        const body = response.body;
        const headers = response.headers;
        const bearerToken = headers.get('Authorization');
        if (bearerToken) {
          const token = bearerToken.replace('Bearer ', '');
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          this.tryExtractAndSaveUserId(token, body);
          this.tryExtractAndSaveRoles(token, body);
        } else if (body && body.jwt) {
          localStorage.setItem('token', body.jwt);
          this.tryExtractAndSaveUserId(body.jwt, body);
          this.tryExtractAndSaveRoles(body.jwt, body);
        }
        return body;
      })
    );
  }

  private tryExtractAndSaveRoles(token: string, body: any) {
    if (body && body.roles) {
      localStorage.setItem('roles', JSON.stringify(Array.from(body.roles)));
      return;
    }
    try {
      const base64Url = token.split('.')[1];
      if (base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        if (payload.roles) {
          const roles = payload.roles.split(',').filter((r: string) => r);
          localStorage.setItem('roles', JSON.stringify(roles));
        }
      }
    } catch (e) {
      console.error('Error al decodificar roles del token JWT', e);
    }
  }

  private tryExtractAndSaveUserId(token: string, body: any) {
    if (body && body.id) {
      localStorage.setItem('userId', body.id);
    } else if (body && body.userId) {
      localStorage.setItem('userId', body.userId);
    } else {
      try {
        const base64Url = token.split('.')[1];
        if (base64Url) {
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const payload = JSON.parse(jsonPayload);
          if (payload.id) localStorage.setItem('userId', payload.id);
          else if (payload.userId) localStorage.setItem('userId', payload.userId);
          else if (payload.custom_id) localStorage.setItem('userId', payload.custom_id);
        }
      } catch (e) {
        console.error('Error al decodificar token JWT', e);
      }
    }
  }
}
