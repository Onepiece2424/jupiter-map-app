Rails.application.routes.draw do
  resources :users
  get 'search_location', to: 'google_maps#search_location'
  get 'reverse_geocode', to: 'google_maps#reverse_geocode'
end
