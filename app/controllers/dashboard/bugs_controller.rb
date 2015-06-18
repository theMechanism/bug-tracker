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
        p '@'*80
        p 'spraarararararaaammmmsss'
        p "#{params.inspect}"
        @project = Project.find(params[:project_id])
        @bug = @project.bugs.build(bug_params)
        if @bug.save
            p '@'*80
            p 'saved a bug whoop'
            p "#{@bug.inspect}"
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
          if @bug.update_attributes(admin: Admin.find(bug_params[:admin_id]))
            # format.html { redirect_to @task, notice: 'Task was successfully created.' }
            format.json { render json: @bug }
          else
            # format.html { render :new }
            format.json { render json: @bug.errors }
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
