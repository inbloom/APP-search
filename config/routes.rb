LRMISearch::Application.routes.draw do

  # This is the only way to do this for now.. when a user enters a query string, do a full search to get the results
  resources :search, :only => [ :full_search ] do
    collection do
      post :full_search,   :path => "/full_search",   :constraints => { :format => /json/ }
    end
  end

  # Until we get the products united, just forward to tagger code
  root :to => 'home#index'

end

