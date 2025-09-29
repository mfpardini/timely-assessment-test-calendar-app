import { FiltersResponse } from 'src/app/shared/services/filters.service';

export const filtersResponseMock: FiltersResponse = {
  items: [
    {
      id: 0,
      title: 'Free',
      color: 'rgba(190,28,28,0.41)',
    },
  ],
  current_page: 2,
  per_page: 15,
  from: 2,
  to: 2,
  first_page_url:
    'https://timely.test/api/accounts/1/calendars/1/events?per_page=15&page=1',
  last_page_url:
    'https://timely.test/api/accounts/1/calendars/1/events?per_page=15&page=10',
  prev_page_url:
    'https://timely.test/api/accounts/1/calendars/1/events?per_page=15&page=2',
  next_page:
    'https://timely.test/api/accounts/1/calendars/1/events?per_page=15&page=5',
  path: 'https://timely.test/api/accounts/1/calendars/1/events',
};
