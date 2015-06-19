require 'spec_helper'

RSpec.describe Dashboard::CommentsController, :type => :controller do

  before do
    self.routes = Provider::Engine.routes
  end

  # routes { Dashboard::Engine.routes }

  describe "GET index" do
    it "assigns @teams" do
      client = create(:client)
      p 'check self'
      p '#'*80
      # p "#{self::Engine.inspect}"
      get :index#, use_route: :dashboard
      # expect(assigns(:clients)).to eq([client])
    end

    # it "renders the index template" do
    #   get :index
    #   expect(response).to render_template("index")
    # end
  end
end