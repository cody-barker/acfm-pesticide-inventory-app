Rails.application.routes.draw do
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :contents, only: [:index, :show, :create, :update, :destroy]
  resources :containers, only: [:index, :show, :create, :update, :destroy]
  resources :products, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index]
  resources :teams
  resources :creation_logs, path: 'creation-logs'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  # post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  

end
