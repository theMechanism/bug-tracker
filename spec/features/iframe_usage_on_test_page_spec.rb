require 'spec_helper'

describe "iframe actions on test_page", type: :feature do
  before(:each) do
    # sign_in create(:admin)
    create(:project)
  end

  describe "renders", :js => true do 
    it "iframe appears on page" do 
      visit dashboard_test_page_path
      
      within_frame find('#mech-bug-iframe') do
        expect(page).to have_content 'Report A Bug!'
      end

    end
  end
  describe "behavior", :js => true do 
    it "user can click to expand pull tab, submit bug" do 
      visit dashboard_test_page_path
      
      within_frame find('#mech-bug-iframe') do
        find("#mech-pull-tab div").click
        find('#mech-bug-report')
        fill_in('Your Name', :with => 'Fake Client')
        fill_in('Description of Bug', :with => 'oh my god this is teeeeerrrrriiiibbbblllleee')
        find('#mech-bug-submit').click
        find('.mech-bug-message')
        expect(page).to have_content('Thank')
      end
    end

    it "user can submit legit bug" do 

    end
  end

end