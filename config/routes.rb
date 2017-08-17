Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: "pages#index"

  get '/home', to: "pages#home"

  get '/profile/:user_id', to: "pages#profile"

  get '/api/website/*url', to: "api/websites#fetchUrl", :format => false

  get '/api/users/:username/portfolios/create', to: "api/portfolios#create"

  get '/api/users/:username/portfolios/all', to: "api/portfolios#show"

end
