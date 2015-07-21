module WaitForAjax
  def wait_for_ajax
    Timeout.timeout(Capybara.default_wait_time) do
      loop until finished_all_ajax_requests?
    end
  end

  def wait_for_iframe_ajax
    Timeout.timeout(Capybara.default_wait_time) do
      loop until finished_all_iframe_ajax_requests?
    end
  end

  def finished_all_iframe_ajax_requests?
    within_frame find('#mech-bug-iframe') do
      page.evaluate_script('$.active').zero?
    end
  end

  def finished_all_ajax_requests?
    page.evaluate_script('$.active').zero?
  end
end