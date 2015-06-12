module Dashboard
  class AdminsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index
    end

    def create
    end

    def show
        @admins = Admin.find(:all, :select => 'id, name').map{|a| a.attributes.merge({bugs_count: a.bugs_count})}
        # @admins = Admin.all.to_json(:methods => [:bugs_count])
        @bugs = Project.first.bugs
    end
    
    def update
    end
    def destroy
    end
  end
end
