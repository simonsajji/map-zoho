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
    { location: new google.maps.LatLng(41.661129, -91.530167) , stopover:false },
    // { location: new google.maps.LatLng( 52.321945, -106.584167) , stopover:false }, //dest
    { location: new google.maps.LatLng(46.877186, -96.789803) , stopover:false },

    { location: new google.maps.LatLng(44.986656, -93.258133) , stopover:false },
    { location: new google.maps.LatLng(44.500000, -89.500000) , stopover:false },
    { location: new google.maps.LatLng(52.146973, -106.677034) , stopover:false },
    // { location: new google.maps.LatLng(40.000000, -89.000000) , stopover:false }, //orgin
    
   
  ];

  mkrs = [
    { lat: 41.661129, lng: -91.530167 },
    { lat: 46.877186, lng: -96.789803},
    { lat: 44.986656, lng: -93.258133},
    { lat: 44.500000, lng: -89.500000},
    { lat: 52.146973, lng: -106.677034},

   

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