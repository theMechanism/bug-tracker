BugTracker::Application.routes.draw do
  devise_for :clients, :controllers => { :registrations => 'clients' }
  devise_for :admins, path:'',:path_names => {:sign_in => 'admin', :sign_out => 'logout'}
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  devise_scope :client do
    root to: "devise/sessions#new"
    get 'clients/:id' => 'clients#show'
  end

  get "/dashboard" => 'dashboard/admins#profile', as:"dashboard"
  namespace :dashboard do
    root to: 'admins#show'
    resources :clients#, only: [:index, :show, :create, :update, :destroy]
    resources :bugs, only: [:index, :show, :edit, :update, :destroy] do
      resources :comments, only: :create
    end
    resources :projects do
      resources :bugs, only: [:create, :new]
      get '/embeddable_script' => 'widgets#embeddable_script'
    end
    resources :admins do#, only: [:index, :show, :new, :create, :update, :destroy]
      resources :bugs, only: :index
    end
    
    if Rails.env.development?
      mount MailPreview => 'mail_preview'
    end

    get '/test_page' => 'widgets#test_page'
  end

  resources :bugs
  resource :clients



  # match "/getform" => "bugs#form", via: [:get]
  get "projects/:id/iframe_load_script" => "iframes#project_load_script", as: :project_iframe_load_script
  get "projects/:id/iframe" => "iframes#iframe", as: :project_iframe

  get "iframe" => "iframes#iframe", as: :iframe
  get "projects/:id/iframe_style" => "iframes#style", as: :project_iframe_style

  match "/getformstyle" => "bugs#style", via: [:get]
  # You can have the root of your site routed with "root"


  # Example of regular route:
  # \  get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with `options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
