export interface CalendarEvent {
  account_billing_id: number;
  allday: boolean;
  calendar_id: number;
  canonical_url: string;
  collapse_recurrence: boolean;
  cost: string;
  cost_currency: string;
  cost_display: string;
  cost_external_url: string;
  cost_type: string;
  created_at: string;
  custom_url: string;
  description_short: string;
  display_one_instance: boolean;
  end_datetime: string;
  end_utc_datetime: string;
  event_status: string;
  exception_rules: string;
  featured: boolean;
  featured_first: boolean;
  feed_event_url: string;
  feed_id: number;
  id: number;
  image_id: number;
  instance: string;
  instant_event: boolean;
  is_example_event: boolean;
  is_journey: boolean;
  is_recurrent: boolean;
  last_end_datetime: string;
  original_timezone: string;
  post_to_facebook: boolean;
  post_to_twitter: boolean;
  post_to_linkedin: boolean;
  priority: number;
  preserve_changes: string;
  recurrence_human_readable: string;
  recurrence_rules: string;
  start_datetime: string;
  start_utc_datetime: string;
  status: string;
  stop_synchronizing: boolean;
  ticket_type: string;
  tickets_count: number;
  tickets_min_price: string;
  timezone: string;
  title: string;
  uid: string;
  updated_at: string;
  url: string;
  user: string;
  images: Image[];
  taxonomies: Taxonomy[];
}

interface Taxonomy {
  taxonomy_venue: Taxonomyvenue;
  taxonomy_organizer: Taxonomyorganizer[];
  taxonomy_category: Taxonomycategory[];
  taxonomy_tag: Taxonomytag[];
  taxonomy_filter_group: Taxonomyfiltergroup[];
}

interface Taxonomyfiltergroup {
  id: number;
  title: string;
  color: string;
  reference_id: number;
  data: Taxonomytag[];
}

interface Taxonomytag {
  id: number;
  title: string;
  color: string;
  reference_id: number;
  image_id: number;
  image: Full2;
  item_type: string;
  filter_group_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Taxonomycategory {
  id: number;
  title: string;
  color: string;
  reference_id: number;
  image_id: number;
  image: Image2;
  item_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Taxonomyorganizer {
  id: number;
  title: string;
  email: string;
  phone: string;
  website: string;
  website_title: string;
  reference_id: number;
  image_id: number;
  image: Image2;
  item_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Image2 {
  id: number;
  reference_id: number;
  title: string;
  file_name: string;
  file_size: string;
  mime_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sizes: Sizes2;
  full: Full;
  medium: Full;
  small: Full;
  thumbnail: Full;
}

interface Sizes2 {
  full: Full2;
  medium: Full2;
  small: Full2;
  thumbnail: Full2;
}

interface Full2 {
}

interface Taxonomyvenue {
  id: number;
  title: string;
  email: string;
  website: string;
  address: string;
  address2: string;
  phone: string;
  phone2: string;
  city: string;
  country_first_division: string;
  country: string;
  geo_location: string;
  postal_code: string;
  venue_type: string;
  reference_id: number;
  image_id: number;
  image: Image;
  item_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Image {
  id: number;
  reference_id: number;
  title: string;
  file_name: string;
  file_size: string;
  mime_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sizes: Sizes;
  full: Full;
  medium: Full;
  small: Full;
  thumbnail: Full;
}

interface Sizes {
  full: Full;
  medium: Full;
  small: Full;
  thumbnail: Full;
}

interface Full {
  url: string;
  width: string;
  height: string;
}