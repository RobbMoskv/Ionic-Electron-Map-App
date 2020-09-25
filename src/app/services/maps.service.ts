import { } from 'googlemaps';
import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  // Initial GeoCoder object to offer google maps API calls
  private geocoder= new google.maps.Geocoder();

  constructor() { }

  // Async function called whenever a user clicks on the map
  // Param: Position used clicked that is either a string or long/lat
  // Return: Promise containing an address
  public geocode (placeIdOrPlaceholder: string | google.maps.LatLngLiteral): Promise<Address> {

    return new Promise<Address>((resolve, reject) => {
      const params: google.maps.GeocoderRequest = typeof placeIdOrPlaceholder === 'string'
      ? { placeId: placeIdOrPlaceholder}
      : { location: placeIdOrPlaceholder};

      // Return a place based on the passed geocode param
      this.geocoder.geocode(params, (results, status) => {
        // Handle error and reject the promise
        if(status !== google.maps.GeocoderStatus.OK){
          return reject(status);
        }

        // Grab the first result
        const result = results[0];
        console.debug('Geocoding returned', result);
        const address = this.parseResult(result);
        
        // Pass to the caller by resolve the promise
        resolve(address);
      });
    });
  };

  // Geocode Result parser 
  // Param: Geocoder result of google maps API request  
  // Return: Construction of an address
  private parseResult(result: google.maps.GeocoderResult): Address{

      const components = result.address_components;
      const parsed = new Map<string, string>();
      
      // Loop through key/value pairs of geocoder result 
      for(const component of components){
        for(const type of component.types){
          parsed.set(type, component.short_name);
        }
      }

      // Generate address object
      const address = {
        addressLine1: parsed.get('street_address') || `${parsed.get('street_number')} ${parsed.get('street_number')}`,
        city: parsed.get('locality'),
        state: parsed.get('administrative_area_level_1'),
        zipCode: parsed.get('postal_code'),
        placeId: result.place_id,
        latitude: result.geometry.location.lat().toString(),
        longitude: result.geometry.location.lng().toString(),
      }

      return address;

  };
}
