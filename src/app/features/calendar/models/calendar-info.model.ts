export interface CalendarInfo {
  active_theme: string;
  calendar_logo_images: string;
  calendar_url: string;
  calendar_url_default: string;
  canonical_url: string;
  default_account_billing_id: number;
  default_currency: string;
  default_mobile_view: string;
  default_view: string;
  disable_export_feeds: boolean;
  enabled_agenda: boolean;
  enabled_map: boolean;
  enabled_year: boolean;
  enabled_month: boolean;
  enabled_posterboard: boolean;
  enabled_stream: boolean;
  enabled_tile: boolean;
  enabled_week: boolean;
  expand_filters: boolean;
  facebook_account: boolean;
  facebook_notice_interval: string;
  linkedin_account: boolean;
  linkedin_notice_interval: string;
  featured_tags: string;
  filter_style: string;
  google_maps_api_key: string;
  has_end_date: boolean;
  id: number;
  lazy_load: boolean;
  mailchimp_api_key: boolean;
  max_pages: string;
  max_width: string;
  page_limit: string;
  post_to_facebook_default: boolean;
  post_to_twitter_default: boolean;
  post_to_linkedin: boolean;
  relabelling: Relabelling;
  show_filters: boolean;
  show_more: boolean;
  show_slider: boolean;
  slider_delay: string;
  social: boolean;
  taxonomies_pre_selected: string;
  taxonomies_visible: string;
  tile_width: string;
  timezone: string;
  title: string;
  website_url: string;
  twitter_account: boolean;
  twitter_notice_interval: string;
  url: string;
  user_role: string;
  week_day_end: string;
  week_day_start: string;
  week_start: string;
  calendar_filters: string[];
  custom_meta_tags: Custommetatags;
  date_time_formats: Datetimeformats;
  branding: Branding;
  date: Date;
  design_customizations: Designcustomizations;
  event: Event;
  features: Features;
  fes: Fes;
  google_analytics: Googleanalytics;
  misc_settings: Miscsettings;
  time: Time;
  toolbar: Toolbar;
  translations: Translations;
  user_permissions: Userpermissions;
  product: Product;
}

interface Product {
  name: string;
  title: string;
  color: string;
  show_title_top_bar: boolean;
}

interface Userpermissions {
  'event-edit': boolean;
}

interface Translations {
  language: string;
  custom: Custom[];
  enabled_languages: string[];
}

interface Custom {
  filename: string;
  language: string;
  json: string;
}

interface Toolbar {
  show_date_range: boolean;
  show_timezone_btn: boolean;
  show_language_btn: boolean;
  show_subscribe_btn: boolean;
  show_print_btn: boolean;
  only_upcoming_events: boolean;
  filters: Filter2[];
  space_filters: Filter2[];
  subscribe_options: Subscribeoptions;
}

interface Subscribeoptions {
  google: boolean;
  apple: boolean;
  outlook: boolean;
  copy: boolean;
  ics: boolean;
  xml: boolean;
}

interface Filter2 {
  taxonomy_type: string;
  required: boolean;
  show_new_btn: boolean;
  filter_group_id: number;
  order: number;
}

interface Time {
  format: string;
  include_timezone: boolean;
  load_timezone: string;
  military: boolean;
  timezone: string;
}

interface Miscsettings {
  equal_rows: boolean;
  event_url_format: string;
  favorite_events: boolean;
  language: string;
  limit_event_display_count: string;
  max_pages: string;
  position: string;
  primary_calendar_url: string;
  show_load_more: boolean;
  show_preferred: boolean;
  slider_delay: string;
  tickets_text: string;
  venue_in_title: boolean;
  websiteURL: string;
  show_total_events: boolean;
}

interface Googleanalytics {
  enabled: boolean;
  script: string;
}

interface Fes {
  enabled: boolean;
  require_signin: boolean;
  auto_approve_fes: boolean;
  auto_approve_events: boolean;
  auto_approve_event_edit: boolean;
  hide_fes_btn: boolean;
  hide_fes_btn_for_spaces: boolean;
  external_tickets: boolean;
  featured_image_required: boolean;
  form_layout: string;
  filters: Filter[];
  custom_fields: Customfield[];
  disclaimer: Disclaimer;
  enable_space_on_fes: boolean;
  enable_event_edit_fes: boolean;
  space_required_on_fes: boolean;
  allow_submitters_cancel_events: boolean;
  enable_resource_booking: boolean;
}

interface Disclaimer {
  enabled: boolean;
  text: string;
  required: boolean;
}

interface Customfield {
  custom_field_version_uid: string;
  text: string;
  type: string;
  hidden: boolean;
  required: boolean;
}

interface Filter {
  taxonomy_type: string;
  required: boolean;
  show_new_btn: boolean;
  filter_group_id: number;
}

interface Features {
  advanced_layouts: number;
  advanced_themes: number;
  autoshare_facebook: number;
  autoshare_twitter: number;
  autoshare_linkedin: number;
  booking_registration: number;
  booking_ticket: number;
  browser_extension: number;
  custom_domain: number;
  custom_header_footer: number;
  custom_meta_tags: number;
  custom_template: number;
  custom_theme: number;
  customer_products: number;
  disable_export_feeds: number;
  embed_limit: number;
  event_finder: number;
  event_url_format: number;
  favorite_events: number;
  filter_advanced: number;
  filter_by_organizer: number;
  filter_by_venue: number;
  filter_custom_groups: number;
  frontend_submissions: number;
  frontend_submissions_custom_fields: number;
  import_feeds_file: number;
  import_feeds_synced: number;
  keyword_search: number;
  multi_language: number;
  newsletter_mailchimp: number;
  number_of_users: number;
  relabelling: number;
  ticketing: number;
  ticketing_custom_fields: number;
  ticketing_multi_billing: number;
  ticketing_promotional_code: number;
  ticketing_qr_code: number;
  user_activity_log: number;
  view_agenda: number;
  view_map: number;
  view_month: number;
  view_posterboard: number;
  view_slider: number;
  view_stream: number;
  view_tile: number;
  view_week: number;
  white_label: number;
}

interface Event {
  display_preference: string;
  dynamic_status: Dynamicstatus;
  filters_as_links: boolean;
}

interface Dynamicstatus {
  enabled: boolean;
  days: number;
}

interface Designcustomizations {
  theme: Theme;
  active_theme: string;
  event_page_layout: string;
  metadata: string;
  header: string;
  footer: string;
  custom_css: string;
  embed_metadata_customization: boolean;
  embed_section_customization: boolean;
  embed_custom_css_customization: boolean;
  embed_metadata: string;
  embed_header: string;
  embed_footer: string;
  embed_custom_css: string;
}

interface Theme {
  name: string;
  font: string;
  fontUrl: string;
  titleFont: string;
  sliderFont: string;
  colors: Color[];
}

interface Color {
  text: string;
  links: string;
  linksHover: string;
  background: string;
  eventBackground: string;
  eventBorder: string;
  border: string;
  primaryButtonBackground: string;
  primaryButtonText: string;
  primaryButtonBorder: string;
  secondaryButtonBackground: string;
  secondaryButtonText: string;
  secondaryButtonBorder: string;
  ctaButtonBackground: string;
  ctaButtonText: string;
  ctaButtonBorder: string;
  eventTitle: string;
  eventTitleDate: string;
  eventTitleBackground: string;
  eventTitleBorder: string;
  eventActionsIcons: string;
  eventActionsBackground: string;
  eventActionsBorder: string;
  eventSharingBackground: string;
  eventTabHover: string;
  eventTabFont: string;
  eventDetailsText: string;
  eventDetailsLink: string;
  eventDetailsBackground: string;
  eventDescriptionBackground: string;
  eventDescriptionText: string;
  eventDescriptionTitle: string;
  eventDetailsBorder: string;
  posterboardBackground: string;
  posterboardBackgroundHover: string;
  posterboardBorder: string;
  posterboardTitle: string;
  posterboardTime: string;
  posterboardExcerpt: string;
  posterboardImageBackground: string;
  posterboardDateBackground: string;
  posterboardDateText: string;
  posterboardEventFeaturedText: string;
  posterboardEventFeaturedBackground: string;
  tileBackground: string;
  tileBackgroundHover: string;
  tileBorder: string;
  tileTitle: string;
  tileTime: string;
  tileExcerpt: string;
  tileImageBackground: string;
  tileDateBackground: string;
  tileDateText: string;
  tileEventFeaturedText: string;
  tileEventFeaturedBackground: string;
  streamViewDateDividerBackground: string;
  streamViewDateDividerText: string;
  streamViewEventBackground: string;
  streamViewEventBackgroundHover: string;
  streamViewEventBorder: string;
  streamViewEventTitle: string;
  streamViewEventTime: string;
  streamViewEventExcerpt: string;
  streamViewEventImageBackground: string;
  streamViewEventFeaturedText: string;
  streamViewEventFeaturedBackground: string;
  agendaBackground: string;
  agendaBackgroundHover: string;
  agendaBorder: string;
  agendaTitle: string;
  agendaTime: string;
  agendaExcerpt: string;
  agendaDateMonthBackground: string;
  agendaDateBackground: string;
  agendaDateText: string;
  agendaDayPrimaryBackground: string;
  agendaDaySecondaryBackground: string;
  agendaDayBorder: string;
  agendaEventFeaturedText: string;
  agendaEventFeaturedBackground: string;
  monthThHeaderBackground: string;
  monthThHeaderText: string;
  monthEventHeaderBackground: string;
  monthMobileEventHeaderBackground: string;
  monthEventHeaderText: string;
  monthMobileEventHeaderText: string;
  monthMobileEventCountBackground: string;
  monthMobileEventCountText: string;
  monthPopupBackground: string;
  monthPopupImageBackground: string;
  monthPopupText: string;
  monthMultiDaySectionBackground: string;
  monthMultiDayBackground: string;
  monthMultiDay: string;
  monthDayBackground: string;
  monthDayText: string;
  monthTodayBackground: string;
  monthMobileDayActiveBackground: string;
  monthEventFeaturedText: string;
  monthEventFeaturedBackground: string;
  weekThHeaderBackground: string;
  weekThHeaderText: string;
  weekDailyBorder: string;
  weekHourlyText: string;
  weekMultiDayBackground: string;
  weekMultiDay: string;
  weekEventTitle: string;
  weekEventDate: string;
  weekEventPrimaryBackground: string;
  weekEventSecondaryBackground: string;
  weekBorder: string;
  weekEventBoxShadow: string;
  weekEventDetails: string;
  weekTodayBackground: string;
  weekTodayColor: string;
  weekEventFeaturedText: string;
  weekEventFeaturedBackground: string;
  sliderBackgroundPrimary: string;
  sliderBackgroundSecondary: string;
  sliderHoverBackgroundPrimary: string;
  sliderHoverBackgroundSecondary: string;
  sliderEventDate: string;
  sliderEventDateHover: string;
  sliderEventDateBackground: string;
  sliderEventTime: string;
  sliderEventTimeHover: string;
  sliderEventDetails: string;
  sliderEventDetailsHover: string;
  sliderControls: string;
  sliderItemIndicator: string;
  sliderItemIndicatorActive: string;
  sliderEventFeaturedText: string;
  sliderEventFeaturedBackground: string;
  carouselBackgroundPrimary: string;
  carouselBackgroundSecondary: string;
  carouselEventDate: string;
  carouselEventDateDayBackground: string;
  carouselEventDateDayMonthBackground: string;
  carouselEventTime: string;
  carouselEventDetails: string;
  carouselControls: string;
  carouselItemIndicator: string;
  carouselItemIndicatorActive: string;
  carouselEventFeaturedText: string;
  carouselEventFeaturedBackground: string;
  modernListViewBackground: string;
  modernListViewTitle: string;
  modernListViewBorder: string;
  modernListViewTime: string;
  modernListViewExcerpt: string;
  modernListViewPrice: string;
  modernListViewImageBackground: string;
  modernListViewEventFeaturedText: string;
  modernListViewEventFeaturedBackground: string;
  cleanListViewBackground: string;
  cleanListViewTitle: string;
  cleanListViewBorder: string;
  cleanListViewTime: string;
  cleanListViewExcerpt: string;
  cleanListViewPrice: string;
  cleanListViewEventFeaturedText: string;
  cleanListViewEventFeaturedBackground: string;
  modernRowViewBackground: string;
  modernRowViewTitle: string;
  modernRowViewBorder: string;
  modernRowViewTime: string;
  modernRowViewExcerpt: string;
  modernRowViewPrice: string;
  modernRowViewImageBackground: string;
  modernRowViewEventFeaturedText: string;
  modernRowViewEventFeaturedBackground: string;
  cleanRowViewBackground: string;
  cleanRowViewTitle: string;
  cleanRowViewBorder: string;
  cleanRowViewTime: string;
  cleanRowViewExcerpt: string;
  cleanRowViewPrice: string;
  cleanRowViewEventFeaturedText: string;
  cleanRowViewEventFeaturedBackground: string;
  mapViewEventTitle: string;
  mapViewEventDate: string;
  mapViewEventBackground: string;
  mapViewEventBorder: string;
  agendaCompactBackground: string;
  agendaCompactTitle: string;
  agendaCompactDateBackground: string;
  agendaCompactDateText: string;
  agendaCompactVenue: string;
  agendaCompactTime: string;
  agendaCompactPrice: string;
  agendaCompactEventFeaturedText: string;
  agendaCompactEventFeaturedBackground: string;
  spaceDetailsBackground: string;
  spaceDetailsTitle: string;
  spaceDetailsVenue: string;
  spaceListViewBackground: string;
  spaceListViewTitle: string;
  spaceListViewBorder: string;
  spaceListViewVenue: string;
  spaceListViewExcerpt: string;
  spaceListViewEventFeaturedText: string;
  spaceListViewEventFeaturedBackground: string;
  spaceWeekViewText: string;
  spaceWeekViewBackground: string;
  spaceDailyViewText: string;
  spaceDailyViewBackground: string;
  membershipViewText: string;
  membershipViewTitle: string;
  membershipViewListBackground: string;
  membershipViewListBorder: string;
  membershipDetailsText: string;
  membershipDetailsTitle: string;
  membershipDetailsBackground: string;
  membershipDetailsHeaderBackground: string;
  membershipDetailsBorder: string;
}

interface Date {
  delimiter: string;
  format: string;
  include_year: boolean;
  setting: string;
  week_start: string;
}

interface Branding {
  calendar_icon: Calendaricon;
  calendar_logo: Calendaricon;
  sign_in_logo: Calendaricon;
  sso_text: string;
}

interface Calendaricon {
}

interface Datetimeformats {
  name: string;
  default: string;
  datepicker: string;
  hours: string;
}

interface Custommetatags {
  description: string;
  keywords: string;
  hide_calendar_from_robots: boolean;
}

interface Relabelling {
  'add event': string;
  'Subscribe to': string;
}