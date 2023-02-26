# SS&C Assessment for Yangha Kim

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Start the Application

Run `ng serve` to start up the website. Navigate to `http://localhost:4200/`.

Run `npm run server` to start up the backend server. Optionally visit `http://localhost:5000/items` to view the json data. The grid will still be autopopulated without backend server running as there is backup local data.

## Features

- Use grid headers to filter and sort the items.
- Use the Date Picker to set start and/or end date for items. Items have a "date" column, which isn't displayed in the grid but exists in the json.
- Use the Autocomplete Fund Clients dropdown to search/select Fund Clients to filter the grid through. Like the "date" column, there exists a "fund_client" column in each of the items which isn't displayed but exists in the json. Click the "x" to remove all chosen filters.
- Click "Export as CSV" to get a csv file of the current view (with filters applied).
- Toggle the 3 accordions by clicking the dark blue headers
- Toggle the sidebar by clicking the arrow on at its top
- Check for responsiveness at
