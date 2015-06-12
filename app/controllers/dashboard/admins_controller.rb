module Dashboard
  class AdminsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index
    end

    def create
    end

    def show
        @admins = Admin.all
        @bugs = Project.first.bugs
    end
    
    def update
    end
    def destroy
    end
  end
end
