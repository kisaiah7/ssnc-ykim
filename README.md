# SS&C Assessment for Yangha Kim

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Start the Application

Run `npm install` to download all packages.

Run `ng serve` to start up the website. Navigate to `http://localhost:4200/`.

Run `npm run server` to start up the backend server. Optionally visit `http://localhost:5000/items` to view the json data. I've added "date" and "fund_client" values to add additional filters to the grid data via the Date Picker and Autocomplete components.

*Backup local data will populate the grid in the case the server is down.

## Lookout For

- Use grid headers to filter and sort the items.
- Use the Date Picker to set start and/or end date for items. Items have a "date" column, which isn't displayed in the grid but exists in the json.
- Use the Autocomplete Fund Clients dropdown to search/select Fund Clients to filter the grid through. Like the "date" column, there exists a "fund_client" column in each of the items which isn't displayed but exists in the json. Click the "x" to remove all chosen filters.
- Click "Export as CSV" to get a csv file of the current view (with filters applied).
- Toggle the 3 accordions by clicking the dark blue headers.
- Toggle the sidebar by clicking the arrow on at its top.
- Visit different pages by clicking through the sidebar.
- Check for responsiveness at 1440px and 1024px. Measurements specified in the mockups are visible above 1440px. They have been adjusted for smaller screens.
