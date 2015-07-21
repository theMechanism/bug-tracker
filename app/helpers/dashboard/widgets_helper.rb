module Dashboard::WidgetsHelper
  def ssl_or_not_based_on_env
    Rails.env == 'production' ? 'https' : 'http'
  end
end
