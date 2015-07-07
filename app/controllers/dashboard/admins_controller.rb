module Dashboard
  class AdminsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index
        render json: Admin.all
    end

    def create
    end

    def show
    end
    def update
    end
    def destroy
    end

    def edit
        @admin = Admin.find(params[:id])
        render layout: false
    end

    def profile
        # redirect_to dashboard_admin_path(current_admin)
        @admin = current_admin
        # @bugs = current_admin.bugs.where.not(status: 'Closed')
        # @projects = @bugs.map{|b| b.project }.uniq
        @bugs = @admin.bugs.order(:created_at)
        @modal_urls = {
            edit_admin: edit_dashboard_admin_path(@admin)
        }.to_json.html_safe
    end
  end
end
