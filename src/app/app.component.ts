import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { FilterService } from 'primeng/api';
import { CountryService } from './countryservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CountryService, FilterService],
})
export class AppComponent {
  countries: any;
  filteredCountries: any;
  selectedCountries: any = [];
  externo: string;

  @Output() inputKeypress = new EventEmitter<KeyboardEvent>();

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getCountries().then((countries) => {
      this.countries = countries;
    });
  }

  onKeypress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      //antes do push deve ter um validador de email
      //setValue no form
      this.selectedCountries.push({ name: this.externo });
    }
  }

  filterCountry(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;

    if (this.filteredCountries) {
      this.externo = query;
    }
  }
}
