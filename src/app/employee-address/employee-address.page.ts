import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-employee-address',
  templateUrl: './employee-address.page.html',
  styleUrls: ['./employee-address.page.scss'],
})
export class EmployeeAddressPage implements OnInit {

  @ViewChild('maps', { static: false }) mapElement: ElementRef;
  map: any;
  address: any;
  lat: any;
  lng: any;
  public geocoder: any = new google.maps.Geocoder;
  locationName: string;
  device_lat:any;
  device_lng:any;
  constructor(
    public toastController: ToastController,
    public nav: NavController,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    private modalController: ModalController,
  ) {
  }

  ngOnInit() {
    this.loadMap();
  }


  async loadMap() {
    this.geolocation.getCurrentPosition().then(async (resp) => {

      this.device_lat=resp.coords.latitude;
      this.device_lng=resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      await this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: latLng,
        zoom: 14,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#080c12" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#080c12" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      });

      map.addListener('center_changed', async () => {
        this.lat = map.center.lat();
        this.lng = map.center.lng();
        await this.getAddressFromCoords(map.center.lat(),map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  async getAddressFromCoords(lat, lng) {
    let latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    await this.geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = "";
          this.address = results[0].formatted_address;
        } else {
          // window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });

  }


  async closemodal() {
    await this.modalController.dismiss({ data: true });
  }

  async saveAddress(data) {
    var allData = { address: data, lat: this.device_lat, lng: this.device_lng };
    await this.modalController.dismiss({ data: allData });


  }



}