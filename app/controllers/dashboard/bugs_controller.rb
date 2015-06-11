module Dashboard
  class BugsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    def index
    end

    def create
    end

    def show
        @bug = Bug.find(params[:id])
        @project = @bug.project
        @admin = @bug.admin
        @comments = @bug.comments.order(:created_at)
        @comment = @bug.comments.new
    end
    
    def update
        p params

    end
    
    def destroy
    end
  end
end
