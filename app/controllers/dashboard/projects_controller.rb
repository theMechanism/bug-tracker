module Dashboard
  class ProjectsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    def index
    end

    def create
    end

    def show
        @project = Project.find(params[:id])
        @bugs = @project.bugs
        @admins = Admin.all
    end
    
    def update
    end
    
    def destroy
    end

    def new
        @project = Project.new
        render layout: false
    end
  end
end
