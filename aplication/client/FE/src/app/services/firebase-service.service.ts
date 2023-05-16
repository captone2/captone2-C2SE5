import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private storage: AngularFireStorage) { }

   // Upload ảnh lên Firebase
   uploadImage(image: File) {
    const path = `images/${image.name}`;
    const ref = this.storage.ref(path);
    return ref.put(image);
  }

  // Lấy đường dẫn ảnh từ Firebase
  getImageUrl(path: string) {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }
}
