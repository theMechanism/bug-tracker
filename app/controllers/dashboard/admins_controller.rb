module Dashboard
  class AdminsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index
    end

    def create
    end

    def show
    end
    def update
    end
    def destroy
    end

    def profile
        # redirect_to dashboard_admin_path(current_admin)
        @bugs = current_admin.bugs.where.not(status: 'Closed')
        @projects = @bugs.map{|b| b.project }.uniq
    end
  end
end
