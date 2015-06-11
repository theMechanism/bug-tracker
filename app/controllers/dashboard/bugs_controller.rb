module Dashboard
  class BugsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index
    end

    def create
    end

    def show
    end
    def update
        p params
    end
    def destroy
    end
  end
end
