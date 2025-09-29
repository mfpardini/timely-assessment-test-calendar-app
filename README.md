# CalendarApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Run the project

This project uses the ngx-env/builder lib to encapsulate sensitive variables in a .env file.
This way, I don't need to save sensitive variables, such as api-key, in Git.

To run the project, run the command:
```sh
cp .env.example .env.dev
```
Edit the `.env.dev` file to include the necessary variables.
Run the `npm install` command to install the dependencies.
Run the `npm start` command to start the project.
The environment variables will be loaded automatically.

## Project observations

It is possible to have other calendar views, displaying the days of the week with their events or even days of the month, but due to the lack of time, I only made a one-day view.

The `ngx-bootstrap` library was used for some visual components, as well as Bootstrap 5 itself, which comes with the styling library.
Styling was not the focus of the project.

You can see that the application state resides in the service classes. I chose not to use any state management libraries.
For example, the `src/app/features/calendar/services/events.service.ts` service class maintains some Subjects, particularly one to notify listeners when filters have changed. This was designed to provide greater control and avoid triggering every time filters change.

There is a datepicker from ngx-bootstrap itself which was used to display the date and select dates.

There are relatively simple filters for categories, organizers, tags, and locations.
They use the same component and use the previously mentioned subject to trigger when there's a change in the listing.
It was a simple way to solve the state problem across multiple components.