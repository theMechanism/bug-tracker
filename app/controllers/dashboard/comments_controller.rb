module Dashboard
  class CommentsController < ApplicationController
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
  end
end