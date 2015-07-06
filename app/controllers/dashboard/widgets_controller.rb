module Dashboard
  class WidgetsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    skip_before_filter :deny_access, :only => [:test_page]
    
    layout "test_page", only: [:test_page]

    def embeddable_script
      # CHECK THAT PROJECT IS ACTIVE
      @project = Project.find(params[:project_id])
      render layout: false
    end

    def test_page
      @project = Project.last
    end

  end
end
