module Dashboard
  class SimpleFormsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    # server side rendering of forms with simple form gem, delivery via ajax to page

    layout nil

    def client_projects  
        
    end

    def index
      @client = Client.first
      @project = @client.projects.build
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