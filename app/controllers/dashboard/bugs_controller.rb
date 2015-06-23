module Dashboard
  class BugsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    def index
    end

    def new 
        @bug = Bug.new
        render layout: false
    end

    def create
        @project = Project.find(params[:project_id])
        @bug = @project.bugs.build(bug_params)
        if @bug.save
            render json: { 
                redirect_url: dashboard_project_path(@project)
            }
        else
            render :new, layout: false
        end
    end

    def show
        @bug = Bug.find(params[:id])
        @project = @bug.project
        @admin = @bug.admin
        @comments = @bug.comments.order(:created_at)
        @comment = @bug.comments.new
    end
    
    def update 
        @bug = Bug.find(params[:id])
        respond_to do |format|
          if @bug.update_attributes(bug_params) #
            # format.html { redirect_to @task, notice: 'Task was successfully created.' }
            @admins = Admin.all
            format.json { render json: 
                {
                    bug: @bug, 
                    callback: 'projectShow.updateTeamLeaderboard',
                    html: render_to_string(partial: '/dashboard/admins/leaderboard.html.erb', :formats => [:html], locals: {admins: @admins})
                } 
            }
          else
            # format.html { render :new }
            format.json { render json: 
                { 
                    errors: @bug.errors.full_messages 
                }
            }
          end
        end
    end
    
    def destroy
    end

    private

    def bug_params
      params.require(:bug).permit(:admin_id, :name, :status, :description, :time_spent)
    end
  end
end
