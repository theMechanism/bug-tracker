module Dashboard
  class BugsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    def index
        @bugs = Bug.all
        @unassigned = @bugs.select{|b| b.admin_id == nil}
        @open = @bugs.select{|b| b.status == 'Open'}
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
        respond_to do |format|
          if @bug.update_attributes(bug_params) #
            return_obj = {}
            return_obj['bug'] = @bug
            if bug_params.keys.count > 1 
                return_obj['redirect_url'] = dashboard_bug_path(@bug)
            else
                case bug_params.keys[0]
                when 'admin_id'
                    @admins = Admin.all
                    return_obj['callback'] = 'projectShow.updateTeamLeaderboard'
                    return_obj['html'] = render_to_string(partial: '/dashboard/admins/leaderboard.html.erb', :formats => [:html], locals: {admins: @admins})
                when 'status'
                    return_obj['callback'] = 'bugTable.updateStatus'
                    return_obj['html'] = render_to_string(partial: '/dashboard/bugs/status_table_cell.html.erb', :formats => [:html], locals: {bug: @bug})
                end
            end
            
                 
            format.json { render json: return_obj }
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
