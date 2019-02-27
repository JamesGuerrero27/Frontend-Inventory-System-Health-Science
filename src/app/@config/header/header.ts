import { HttpHeaders } from '@angular/common/http';

export const contentHeaders = {
  headers: new HttpHeaders({
  "Cache-Control": "no-cache"
  })
};