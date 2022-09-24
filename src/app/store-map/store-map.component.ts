import { LocationStrategy } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core'
// import { Coordinates } from '@shared/models/coordinates.model';
import MarkerClusterer from '@googlemaps/markerclustererplus';
// import google fro 

@Component({
  selector: 'store-map',
  template: `<div id="map" style="height: 100vh"></div>`,
  styleUrls: ['./store-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreMapComponent implements AfterViewInit {

  @ViewChild('map', {static: false}) info: ElementRef | undefined;
   labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   locations = [
    { location: new google.maps.LatLng(51.213890, -102.462776) , stopover:false },
    // { location: new google.maps.LatLng( 52.321945, -106.584167) , stopover:false }, //dest
    { location: new google.maps.LatLng(50.288055, -107.793892) , stopover:false },

    { location: new google.maps.LatLng(52.757500, -108.286110) , stopover:false },
    { location: new google.maps.LatLng(45.700001, -73.633331) , stopover:false },
    { location: new google.maps.LatLng(45.630001, -73.519997) , stopover:false },
    { location: new google.maps.LatLng(39.791000, -86.148003) , stopover:false },
    { location: new google.maps.LatLng(43.838413, -79.086761) , stopover:false },
    { location: new google.maps.LatLng(42.778828, -81.175369) , stopover:false },
    { location: new google.maps.LatLng(40.367474, -82.996216) , stopover:false },
    // { location: new google.maps.LatLng(40.000000, -89.000000) , stopover:false }, //orgin
    
   
  ];

  mkrs = [
    { lat: 50.288055, lng: -107.793892 },
    { lat: 51.213890, lng: -102.462776 },
    // { lat: 52.321945, lng: -106.584167},
    { lat: 52.757500, lng: -108.286110},
    { lat:45.700001, lng: 	-73.633331 },
    { lat: 45.630001, lng: -73.519997},
    { lat: 39.791000, lng: 	 -86.148003},
    { lat: 43.838413, lng: 	-79.086761},
    { lat: 42.778828, lng: -81.175369},
    { lat: 40.367474, lng: -82.996216},
    // { lat: 40.000000, lng: -89.000000},

  ]

  ngAfterViewInit() {
   
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 3,
        center: { lat: 45.630001, lng: -73.519997},
      }
    )
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    const stepDisplay = new google.maps.InfoWindow();

    
    
    const markers = this.mkrs.map((location, i) => {
      return new google.maps.Marker({
        position: location,
        label: this.labels[i % this.labels.length],
      });
    });

    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });

    this.calculateAndDisplayRoute(
      directionsRenderer,
      directionsService,
      markers,
      stepDisplay,
      map
    );

  }

  calculateAndDisplayRoute(directionsRenderer:any,
    directionsService:any,
    markerArray:any,
    stepDisplay:any,
    map:any)
  {
     for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  directionsService
      .route(
        {
        origin: { lat: 40.000000, lng: -89.000000},
        destination: { lat: 52.321945, lng: -106.584167},
        waypoints:this.locations,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((result:any) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        // document.getElementById("warnings-panel").innerHTML =
        //   "<b>" + result.routes[0].warnings + "</b>";
        directionsRenderer.setDirections(result);
        // showSteps(result, markerArray, stepDisplay, map);
      })
      .catch((e:any) => {
        window.alert("Directions request failed due to " + e);
      });

   


  }
}