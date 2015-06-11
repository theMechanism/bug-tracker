module ApplicationHelper
    def is_admin?
       current_admin.present?
    end
    def deny_access
        redirect_to '/admin'
    end
end
