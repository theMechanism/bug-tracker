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
        redirect_to dashboard_path if params[:id].to_i == current_admin.id
    end

    def update
        @admin = Admin.find(params[:id])
        if @admin.update_attributes(admin_params)
            render json: { 
                redirect_url: dashboard_admin_path(@admin)
            }
        else
            render :edit, layout: false
        end
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

    private 
    def admin_params
      params.require(:admin).permit(:name, :is_project_manager)
    end
  end
end
