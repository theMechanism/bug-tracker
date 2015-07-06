module Dashboard
  class WidgetsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?

    def embeddable_script
      # CHECK THAT PROJECT IS ACTIVE
      @project = Project.find(params[:project_id])
      render layout: false
    end

    def test_page

    end

  end
end
