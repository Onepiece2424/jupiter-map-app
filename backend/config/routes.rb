Rails.application.routes.draw do
  resources :users
  get 'search_location', to: 'google_maps#search_location'
end
