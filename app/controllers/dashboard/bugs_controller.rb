module Dashboard
  class BugsController < ApplicationController
    include ApplicationHelper
    include BugMailerAlert
    before_filter :deny_access, :unless => :is_admin?

    def index
        p '#'*80
        p 'admin scoped bugs, heres the params'
        p "#{params.inspect}"
        respond_to do |format|
            format.html
            format.json { render json: Bug.all }
        end
    end

    def new
        @bug = Bug.new
        render layout: false
    end

    def edit
        @bug = Bug.find(params[:id])
        render layout: false
    end

    def create
        @project = Project.find(params[:project_id])
        @bug = @project.bugs.build(bug_params)
        if @bug.save
            render json: {
                redirect_url: dashboard_project_path(@project)
            }
        else
            render :new, layout: false
        end
    end

    def show
        @bug = Bug.find(params[:id])
        @project = @bug.project
        @admin = @bug.admin
        @comments = @bug.comments.order(:created_at)
        @comment = @bug.comments.new
        @modal_urls = {
            modal_edit_bug: edit_dashboard_bug_path(@bug)
        }.to_json.html_safe
    end

    def update
        @bug = Bug.find(params[:id])
        # p "inspect bug in update method #{@bug.inspect}"
        initial_bug = @bug.dup
        respond_to do |format|
          if @bug.update_attributes(bug_params) #

            BugMailerAlert::alert_mailer_of_relevant_changes(@bug, initial_bug)
            return_obj = {}
            return_obj['bug'] = @bug
            if bug_params.keys.count > 1
                return_obj['redirect_url'] = dashboard_bug_path(@bug)
            else
                case bug_params.keys[0]
                when 'admin_id'
                    @admins = Admin.all
                    return_obj['callback'] = 'bugTable.updateAdminAssign'
                    return_obj['html'] = {
                        leaderboard: render_to_string(partial: '/dashboard/admins/leaderboard.html.erb', :formats => [:html], locals: {admins: @admins}),
                        row: render_to_string(partial: '/dashboard/bugs/row.html.erb', :formats => [:html], locals: {bug: @bug})
                    }
                when 'status'
                    return_obj['callback'] = 'bugTable.updateStatus'
                    return_obj['html'] = render_to_string(partial: '/dashboard/bugs/status_table_cell.html.erb', :formats => [:html], locals: {bug: @bug})
                end
            end
            format.json { render json: return_obj }
            # if initial_status != @bug.status
            #     @bug.handle_status_change
            # end
          else
            format.json { render json:
                {
                    errors: @bug.errors.full_messages
                }
            }
          end
        end
    end

    def destroy
    end

    private

    def bug_params
      params.require(:bug).permit(:admin_id, :name, :status, :description, :time_spent)
    end
  end
end
