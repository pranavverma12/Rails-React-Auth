Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create]
  delete :logout, to: "sessions#logout"
  get :login, to: "sessions#login"
  resources :registrations, only: [:create]

end
