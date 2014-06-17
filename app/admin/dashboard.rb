ActiveAdmin.register_page "Dashboard" do
  menu :priority => 1
  content :title => proc{ I18n.t("active_admin.dashboard") } do

    columns do

      column do
        panel "Recent Bugs" do
          table_for Bug.order('id desc').limit(10) do
            column("Bug ID")   {|bug| link_to(bug.id, admin_project_bug_path(bug.project.id, bug.id)) } 
            column("Project"){|bug| link_to(bug.project.name, admin_project_path(bug.project)) } 
            column("Reported At"){|bug| bug.created_at } 
            column("Status")   {|bug| status_tag(bug.status)} 
          end
        end
      end
      column do
        panel "Projects" do
          table_for Project.order('id desc').limit(10) do
            column("Project Name")   {|project| project.name } 
            column("Client Contact"){|project| project.client.email } 
            column("Expiration"){|project| project.expiration } 
            
          end
        end
      end
      
    end # columns

    
      
    # Define your dashboard sections here. Each block will be
    # rendered on the dashboard in the context of the view. So just
    # return the content which you would like to display.
    
    # The dashboard is organized in rows and columns, where each row
    # divides the space for its child columns equally.

    # To start a new row, open a new 'columns' block, and to start a
    # new column, open a new 'colum' block. That way, you can exactly
    # define the position for each content div.

    # == Simple Dashboard Column
    # Here is an example of a simple dashboard column
    #
    #   column do
    #     panel "Recent Posts" do
    #       content_tag :ul do
    #         Post.recent(5).collect do |post|
    #           content_tag(:li, link_to(post.title, admin_post_path(post)))
    #         end.join.html_safe
    #       end
    #     end
    #   end
    
    # == Render Partials
    # The block is rendererd within the context of the view, so you can
    # easily render a partial rather than build content in ruby.
    #
    #   column do
    #     panel "Recent Posts" do
    #       render 'recent_posts' # => this will render /app/views/admin/dashboard/_recent_posts.html.erb
    #     end
    #   end

  end # content
end