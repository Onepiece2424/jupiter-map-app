Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  resources :users, only: [:index] do
    collection do
      get 'me'
      get 'suggestions'
      get 'notifications'
    end
  end
  resources :favorite_places
  resources :friends, only: [:index]
  resources :friend_requests, only: [:create]
  get 'search_location', to: 'google_maps#search_location'
  get 'reverse_geocode', to: 'google_maps#reverse_geocode'
end
