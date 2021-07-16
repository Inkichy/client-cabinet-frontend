import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class GetImageService {
  public cache = new Map();

  constructor() { }

  cacheImg(blockId: number, id: string, type: string = 'PREVIEW_PICTURE') {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const result = `${environment.apiEndpoint}cabinet/getImage?&iblock=${blockId}&key=${type}&id=${id}`;
    this.cache.set(id, result);
    return result;
  }
  getImageUrl(blockId: number, id: string, type: string = 'PREVIEW_PICTURE') {
    return this.cacheImg(blockId, id, type);
  }
}
