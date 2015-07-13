module IframesHelper

  def javascript_includer
    puts 'js baby'
    javascript_include_tag controller: 'iframes'
  end
end
