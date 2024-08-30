Rails.application.routes.draw do
# Fallback for React Router, ensuring only non-AJAX and HTML requests are caught
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Existing resource routes
  resources :contents, only: [:index, :show, :create, :update, :destroy]
  resources :containers, only: [:index, :show, :create, :update, :destroy]
  resources :products, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index]
  resources :teams
  resources :creation_logs

  # Authentication routes
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

end
