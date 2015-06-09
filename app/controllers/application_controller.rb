class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception
    before_filter :dashboard_layout
    layout :dashboard_layout
    def dashboard_layout
        if dashboard_mode
            'dashboard'
        end
    end

    def dashboard_mode
        self.class.parent == Dashboard
    end


end
