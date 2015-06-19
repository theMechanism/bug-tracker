module Dashboard
  class CommentsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    
    def index  
    end

    def create
        @bug = Bug.find(params[:bug_id])
        @comment = @bug.comments.build(comment_params.merge(admin: current_admin))
        if @comment.save
            # @comments = @bug.comments
            render json: {
                callback: 'bugShow.addComment',
                html: render_to_string(partial: 'list_item.html.erb', locals: { comment: @comment })
            }
        else  
            render json: {
                errors: @comment.errors
            }
        end
    end

    def show
    end
    def update
    end
    def destroy
    end

    private

    def comment_params
        params.require(:comment).permit(:content)
    end 
  end
end