import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryModule, ImageItem, GalleryItem, GalleryComponent, Gallery } from 'ng-gallery';
import { Review, Category, SendReview } from '../../Models/Models';
import { ApiService } from '../../Services/ApiService';
import { AuthService } from '../../Services/AuthService';
import { UserRole } from '../../Utilities/enums/Enums';
import { Lightbox } from 'ng-gallery/lightbox';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { Inject } from '@angular/core';


@Component({
    selector: 'app-supplier-profile',
    templateUrl: './supplier-profile.component.html',
    styleUrls: ['./supplier-profile.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
  })

  export class SupplierProfileComponent implements OnInit  {
    @Input() changesProfileId: number | undefined;
    images: GalleryItem[] = [];

    profileId: string = '';
    profileSlug: string ='';
    isMobile: Observable<boolean>;
    phoneNumber?: string;
    email?: string;
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    reviews?: Review[];
    numberProfileId!: number;
    currentUserId?: number;
    currentUserRole?: UserRole;
    isCurrentProfileLogged: boolean = false;
    customerUserLoggedId: boolean = false;
    userLoggedIn: boolean = false;
    reviewSent: boolean = false;
    areasOfInterest: string[] = [];
    urlProfileName: string = '';
    supplierCategories!: Category[];
    selectedCategoryId: number | null = null;

    imageObject: any = [];
    
    //model
    profileImage?: string;
    profileName?:string;
    categories?: Category[];
    motto?: string;
    city?: string;
    location?: string;
    description?: string;

    //rating part
    selectedRating: number = 0;
    reviewText: string = '';
    offerRating: boolean = false;

    /* ---------- QR code ---------- */
    qrData?: string;                                     // bound to <qrcode>
    @ViewChild('qrCanvas', { read: ElementRef })
    qr!: ElementRef<HTMLDivElement>;


    constructor(
      private ref: ChangeDetectorRef, 
      private meta: Meta,
      private title: Title,
      private breakpointObserver: BreakpointObserver, 
      private route: ActivatedRoute, 
      private router: Router, 
      private apiService: ApiService, 
      @Inject(Gallery) private gallery: Gallery,
      @Inject(Lightbox) private lightbox: Lightbox,
      private authService: AuthService){
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
    }
    
    ngOnInit(): void {
      this.route.data.subscribe(({ profile }) => {
        this.profileName = profile.businessName;
        this.profileImage = profile.images.find((x: { isProfileImage: any; }) => x.isProfileImage)?.imageUrl;
        this.motto = profile.motto;
        this.location = profile.cityName;
        this.categories = profile.categories;
        this.phoneNumber = profile.phoneNumber;
        this.email = profile.email;
        this.description = profile.description;
        this.websiteUrl = this.addHttpPrefix(profile.websiteUrl);
        this.facebookUrl = this.addHttpPrefix(profile.facebookUrl);
        this.instagramUrl = this.addHttpPrefix(profile.instagramUrl);
        this.youtubeUrl = this.addHttpPrefix(profile.youtubeUrl);
        this.numberProfileId = Number(this.profileId);
        this.reviews = profile.reviews;
        this.areasOfInterest = profile.areaOfInterestNames;
        this.images = profile.images.map((img: { imageUrl: any; }) => new ImageItem({ src: img.imageUrl, thumb: img.imageUrl }));
        this.supplierCategories = profile.categories;
    
        const galleryRef = this.gallery.ref('lightboxGallery');
        galleryRef.load(this.images);
    
        this.updateMetaTags();
      });

      this.route.params.subscribe((params: { [x: string]: string; }) => {
        const profileInfo: string = params['profileId'];
      
        const match = profileInfo.match(/^(.*)-(\d+)$/);
      
        if (match) {
          const namePart = match[1]; // everything before the last -digits
          const idPart = match[2];   // the numeric ID
      
          this.urlProfileName = namePart.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
          this.profileId = idPart;
        } else {
          // fallback in case URL is malformed
          this.urlProfileName = '';
          this.profileId = '';
        }
      });
      
      if (this.authService.isAuthenticated()){
        this.userLoggedIn = true;
        var user = this.authService.getLoggedUser();
        this.currentUserRole = user.role;
        this.currentUserId = user.id;
        if (this.profileId != undefined && user.profilesIds?.includes(Number(this.profileId))){
          this.isCurrentProfileLogged = true;
        }
      }

      if (isNaN(Number(this.profileId)) && this.changesProfileId == undefined) {
        this.router.navigate(['/furnizori']);
      } else {
        if (this.changesProfileId != undefined){
          this.apiService.getProfileToReview(this.changesProfileId).subscribe(response => {
            this.profileName = response.businessName;
            this.profileImage = response.images.filter(x => x.isProfileImage == true).map(x => x.imageUrl)[0];
            this.motto = response.motto;
            this.location = response.cityName;
            this.categories = response.categories;
            this.phoneNumber = response.phoneNumber;
            this.email = response.email;
            this.description = response.description;
            this.websiteUrl = response.websiteUrl ? this.addHttpPrefix(response.websiteUrl) : undefined;
            this.facebookUrl = response.facebookUrl ? this.addHttpPrefix(response.facebookUrl) : undefined;
            this.instagramUrl = response.instagramUrl ? this.addHttpPrefix(response.instagramUrl) : undefined;
            this.youtubeUrl = response.youtubeUrl ? this.addHttpPrefix(response.youtubeUrl) : undefined;
            this.areasOfInterest = response.areaOfInterestNames;
            this.images = response.images.filter(x => x.isProfileImage == false).map(x => new ImageItem({ src: x.imageUrl, thumb: x.imageUrl }));
            this.supplierCategories = response.categories;

            const galleryRef = this.gallery.ref('lightboxGallery');
            galleryRef.load(this.images);
          })
        }
        else{
          this.apiService.getUserProfile(Number(this.profileId)).subscribe(response => {
            if (this.urlProfileName != this.sanitizeBusinessName(response.businessName)){
              this.router.navigate(['/furnizori']);
            }
            this.profileName = response.businessName;
            this.profileImage = response.images.filter(x => x.isProfileImage == true).map(x => x.imageUrl)[0];
            this.motto = response.motto;
            this.location = response.cityName;
            this.categories = response.categories;
            this.phoneNumber = response.phoneNumber;
            this.email = response.email;
            this.description = response.description;
            this.websiteUrl = response.websiteUrl ? this.addHttpPrefix(response.websiteUrl) : undefined;
            this.facebookUrl = response.facebookUrl ? this.addHttpPrefix(response.facebookUrl) : undefined;
            this.instagramUrl = response.instagramUrl ? this.addHttpPrefix(response.instagramUrl) : undefined;
            this.youtubeUrl = response.youtubeUrl ? this.addHttpPrefix(response.youtubeUrl) : undefined;
            this.numberProfileId = Number(this.profileId);
            this.reviews = response.reviews;
            this.areasOfInterest = response.areaOfInterestNames;
            this.images = response.images.filter(x => x.isProfileImage == false).map(x => new ImageItem({ src: x.imageUrl, thumb: x.imageUrl }));
            this.supplierCategories = response.categories;

            const galleryRef = this.gallery.ref('lightboxGallery');
            galleryRef.load(this.images);

            this.updateMetaTags();
          })
        }
      }
    }

    selectCategory(id: number): void {
      this.selectedCategoryId = id;
    }

    setRating(rating: number): void {
      this.selectedRating = rating;
    }
  
    submitReview(): void {
      var review = {
        score: this.selectedRating,
        reviewText: this.reviewText,
        userId: this.currentUserId,
        profileId: Number(this.numberProfileId),
        categoryId: this.selectedCategoryId
      } as SendReview

      this.apiService.saveReview(review).subscribe({
        next: () => {
          this.reviewSent = true;
        },
        error: (error) => {
          console.error('Error saving review:', error);
          // Handle error
        }
      });

      
      // Add your logic to submit the review to the server or perform any other actions
    }

    isReviewIncomplete(){
      if (this.reviewText == '' || this.selectedRating == 0 || this.selectedCategoryId == null || this.selectedCategoryId == undefined){
        return true;
      }
      return false;
    }

    showRatingInput(){
      this.offerRating = true;
    }

    addHttpPrefix(url: string): string {
      // Check if the URL has a valid protocol (http:// or https://)
      const hasValidProtocol = /^https?:\/\//i.test(url);
    
      // If not, add the http:// prefix
      if (!hasValidProtocol) {
        return `http://${url}`;
      }
    
      // If already has a valid protocol, return the original URL
      return url;
    }

    openLightbox(index: number): void {
      const galleryRef = this.gallery.ref('lightboxGallery');
      if (index >= 0 && index < this.images.length) {
        console.log(`Opening Lightbox at index: ${index}`);
        galleryRef.set(index);
        this.lightbox.open(index, 'lightboxGallery', {
          panelClass: 'fullscreen', // ✅ Makes it full-screen
        });
      } else {
        console.warn(`[NgGallery]: Invalid index ${index}.`);
      }
    }

    sanitizeBusinessName(slug: string): string {
      return slug
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    updateMetaTags() {
      const fullUrl = `https://www.eventador.ro/furnizor/${this.urlProfileName.replace(/\s+/g, '-')}-${this.profileId}`;
      this.title.setTitle(`${this.profileName} | Eventador`);
      this.meta.updateTag({ name: 'description', content: this.motto || '' });
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
      // OpenGraph tags (for Facebook)
      this.meta.updateTag({ property: 'og:title', content: this.profileName || '' });
      this.meta.updateTag({ property: 'og:description', content: this.motto || '' });
      this.meta.updateTag({ property: 'og:image', content: this.profileImage || '' });
      this.meta.updateTag({ property: 'og:url', content: fullUrl });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
    
      // Twitter meta (optional, good for sharing)
      this.meta.updateTag({ name: 'twitter:title', content: this.profileName || '' });
      this.meta.updateTag({ name: 'twitter:description', content: this.motto || '' });
      this.meta.updateTag({ name: 'twitter:image', content: this.profileImage || '' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    }


    /** Build the absolute profile URL and reveal the QR */
generateQR(): void {
  this.qrData = window.location.origin + this.router.url;
}

/** Download PNG that includes QR + “Powered by” footer */
downloadQR(): void {
  this.renderQrWithFooter((canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `profile-${this.profileName}-qr.png`;
    link.click();
  });
}

/** Print QR + footer in a clean popup */
printQR(): void {
  this.renderQrWithFooter((canvas) => {
    const imgUrl = canvas.toDataURL('image/png');

    const popup = window.open('', '_blank', 'width=400,height=460');
    if (!popup) return;

    popup.document.write(`
      <html><head><title>Print QR</title>
      <style>
        body{margin:0;display:flex;justify-content:center;align-items:center;height:100vh;}
        img{max-width:100%;}
      </style>
      </head>
      <body onload="window.print();window.close()">
        <img src="${imgUrl}" alt="QR code">
      </body></html>
    `);
    popup.document.close();
  });
}

private renderQrWithFooter(done: (c: HTMLCanvasElement) => void): void {
  const original = this.qr?.nativeElement.querySelector('canvas') as HTMLCanvasElement | null;
  if (!original) return;

  if (!this.profileName) {
    alert('Profilul nu a fost încărcat complet. Încearcă din nou în câteva secunde.');
    return;
  }

  const w = original.width;
  const h = original.height;

  const nameFontSize = 18;
  const footerFontSize = 14;
  const verticalGap = 6;
  const logoHeight = 18;

  const maxTextWidth = w - 20; // margin of 10px on each side

  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return;
  ctx.font = `${nameFontSize}px Arial`;

  const name = this.profileName;

  // Try to split the profile name into two lines
  let nameLines: string[] = [name];
  if (ctx.measureText(name).width > maxTextWidth) {
    const words = name.split(' ');
    let line1 = '';
    let line2 = '';
    for (const word of words) {
      if (ctx.measureText(line1 + ' ' + word).width <= maxTextWidth) {
        line1 += (line1 ? ' ' : '') + word;
      } else {
        line2 += (line2 ? ' ' : '') + word;
      }
    }
    nameLines = [line1.trim(), line2.trim()];
  }

  const nameLineCount = nameLines.length;

  // Height for name section (1 or 2 lines)
  const nameSectionHeight = nameLineCount * nameFontSize + verticalGap;

  // Total footer area (name section + powered by)
  const footerHeight = nameSectionHeight + footerFontSize + verticalGap;

  // Create final canvas
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h + footerHeight;

  const finalCtx = canvas.getContext('2d');
  if (!finalCtx) return;

  // Draw QR code
  finalCtx.drawImage(original, 0, 0);

  // Draw profile name (1 or 2 lines)
  finalCtx.font = `${nameFontSize}px Arial`;
  finalCtx.fillStyle = '#888';
  finalCtx.textAlign = 'center';
  finalCtx.textBaseline = 'top';

  let currentY = h + 3;

  for (const line of nameLines) {
    finalCtx.fillText(line, w / 2, currentY);
    currentY += nameFontSize;
  }

  currentY += verticalGap;

  // Load logo and draw powered by section
  const logo = new Image();
  logo.onload = () => {
    finalCtx.font = `${footerFontSize}px Arial`;
    finalCtx.fillStyle = '#888';
    finalCtx.textAlign = 'left';
    finalCtx.textBaseline = 'middle';

    const poweredByText = 'Powered by';
    const textWidth = finalCtx.measureText(poweredByText).width;

    const logoWidth = (logo.width / logo.height) * logoHeight;
    const totalWidth = textWidth + 6 + logoWidth;
    const startX = (w - totalWidth) / 2;
    const footerY = currentY + footerFontSize / 2;

    finalCtx.fillText(poweredByText, startX, footerY);
    finalCtx.drawImage(logo, startX + textWidth + 6, footerY - logoHeight / 2, logoWidth, logoHeight);

    done(canvas);
  };

  logo.src = 'assets/imagesandvideos/pinklogo.png';
}



}