module Dashboard
  class ClientsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index  
        
        @clients = Client.browser_facing_attrs
        
    end

    def create
    end

    def show
    end
    def update
    end
    def destroy
    end
  end
end
