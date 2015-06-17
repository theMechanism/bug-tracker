module Dashboard
  class ProjectsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    def index
        @projects = Project.all
    end

    def create
        @project = Project.new(project_params) 
        if @project.save
            render json: { 
                redirect_url: dashboard_project_path(@project)
            }
        else
            render :new, layout: false
        end
    end

    def show
        @project = Project.find(params[:id])
        @bugs = @project.bugs
        @admins = Admin.all
        @modal_urls = {
            edit_project: edit_dashboard_project_path(@project),
            new_bug: new_dashboard_bug_path
        }.to_json.html_safe 
    end
    
    def update
    end
    
    def destroy
    end

    def new
        @project = Project.new
        render layout: false
    end

    def edit
        @project = Project.find(params[:id])
        render layout: false
    end

    private
    def project_params
        params.require(:project).permit(:name, :blurb, :client_id, :expiration, :active, :admin_id, :git_repo_url, :dev_server_url)
    end
  end
end

























