export interface EventsFiltersRequestParams {
  start_date_utc?: number;
  end_date_utc?: number;
  term?: string;
  location?: string;
  categories?: string;
  tags?: string;
  organizers?: string;
  venues?: string;
  filter_groups?: string;
  event_ids?: string;
  featured?: boolean;
  per_page?: number;
  page?: number;
  only_with_geo?: boolean;
  geo_location?: string;
  radius?: number;
}
