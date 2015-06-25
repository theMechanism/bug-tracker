module Dashboard::BugsHelper
  
  def map_status_to_css_class(bug)
    case bug.status
    when 'Open'
      'danger'
    when 'Verify'
      'warning'
    when 'Closed'
      'success'
    else
      ''
    end
  end

  def current_admin_is_project_manager(bug)
    current_admin == bug.project_manager
  end
end
