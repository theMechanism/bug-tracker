module Dashboard
  class ClientsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index  
        @clients = Client.browser_facing_attrs
        @modal_content_urls = {
            new_project_form: new_dashboard_project_path
        }
        
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
