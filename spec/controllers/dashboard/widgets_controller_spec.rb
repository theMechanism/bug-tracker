require 'spec_helper'

RSpec.describe Dashboard::WidgetsController, :type => :controller do

  before do |example|
    
    sign_in create(:admin)
    @project = create(:project)
    # if example.metadata[:with_bug]
    #   @bug = create(:bug)
    #   @project = @bug.project
    # end
  end

  describe 'render iframe js call enclosed in script tags' do
    it 'renders index page' do
      get :index
      expect(response).to render_template("index")
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @projects' do
      get :index
      expect(assigns(:projects)).to eq([@project])
    end
  end


end
