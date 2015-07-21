require 'spec_helper'

describe "embeddable script", type: :feature do
  before(:each) do |example|
    admin = create(:admin)
    login_as(admin, :scope => :admin)
    @project = create(:project)
    visit dashboard_project_embeddable_script_path(@project)
  end

  describe "valid format" do 
    it "enclosed in <script> tags" do 
      expect(page).to have_content '<script>'
      expect(page).to have_content '</script>'
    end
  end

  describe "contains correct url for iframe load script" do
    it "has https://" do
      expect(page).to have_content 'https://'
    end
  end

end