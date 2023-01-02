import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { MapMarker } from '@angular/google-maps';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface GeocodeResponse {
  results: any[];
  status: string;
}


@Component({
  selector: 'app-pruebitas',
  templateUrl: './pruebitas.component.html',
  styleUrls: ['./pruebitas.component.css']
})

export class PruebitasComponent implements OnInit  {

  center: google.maps.LatLngLiteral = {lat: -0.95, lng: -80.72};
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral | null = null;
  street = '';
  city = '';
  country = '';
  @ViewChild('mapContent') mapContent?: TemplateRef<any>;


  constructor(private http: HttpClient,private modalService: NgbModal) { }

  ngOnInit(
  ) { }

  openModal() {
    const modalRef = this.modalService.open(this.mapContent, { centered: true });
   
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
      this.getAddress(this.markerPosition);
    }
  }

  getAddress(position: google.maps.LatLngLiteral) {
    const API_KEY = 'AIzaSyCUeNoX1-1WV8P5mWKUz8LUwxBWc6XyYoA';
    const lat = position.lat;
    const lng = position.lng;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    this.http.get<GeocodeResponse>(url).subscribe(response => {
      if (response.status === 'OK') {
        const addressComponents = response.results[0].address_components;

        for (const component of addressComponents) {
          if (component.types.includes('route')) {
            this.street = component.long_name;
          } else if (component.types.includes('locality')) {
            this.city = component.long_name;
          } else if (component.types.includes('country')) {
            this.country = component.long_name;
          }
        }

        console.log(`Street: ${this.street}`);
        console.log(`City: ${this.city}`);
        console.log(`Country: ${this.country}`);
      } else {
        console.error(`Error: ${response.status}`);
      }
    }, error => {
      console.error(error);
    });
  }

}
