Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'users/registrations'
  }
  resources :users, :favorite_places
  get 'search_location', to: 'google_maps#search_location'
  get 'reverse_geocode', to: 'google_maps#reverse_geocode'
end
