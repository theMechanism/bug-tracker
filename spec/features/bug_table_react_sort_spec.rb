require 'spec_helper'

describe "bug sort table in dashboard/bugs/index page", type: :feature do
  before(:each) do |example|
    @bug = create(:bug)

    @project = @bug.project
    @project_manager =  @project.admin
    second_dev


    if example.metadata[:user_clicks_n_expands] 
      visit dashboard_test_page_path
      
      within_frame find('#mech-bug-iframe') do
        find("#mech-pull-tab div").click
      end
    end
  end

  describe "renders", :js => true do 
    it "iframe appears on page" do 
      visit dashboard_test_page_path
      
      within_frame find('#mech-bug-iframe') do
        expect(page).to have_content 'Report A Bug!'
      end

    end
  end
  describe "behavior", :user_clicks_n_expands, :js => true do 
    it "user can click to expand pull tab, submit bug" do       
      within_frame find('#mech-bug-iframe') do
        expect(page).to have_content('Submit')
      end
    end

    it "user can submit legit bug, adds to DB" do 
      within_frame find('#mech-bug-iframe') do
        first_bug_count = Bug.count
        find('#mech-bug-report')
        fill_in('Your Name', :with => 'Fake Client')
        fill_in('Description of Bug', :with => 'oh my god this is teeeeerrrrriiiibbbblllleee')
        find('#mech-bug-submit').click
        find('.mech-bug-message')
        expect(page).to have_content('Thank')
        expect(Bug.count).to eq(first_bug_count + 1)
      end
    end

    it "prevents submission with incomplete user input" do
      within_frame find('#mech-bug-iframe') do
        find('#mech-bug-report')
        # doesn't fill in fields
        find('#mech-bug-submit').click
        find('.mech-bug-message')
        expect(page).to have_content('error')
      end
    end

    it "user clicks 'View Bugs' and opens tab to log in" do 
      within_frame find('#mech-bug-iframe') do
        # for now -- as the iframe is not served by a controller with client specific content --
        # evenutally this link will be tailored for each client
        # upon this upgrade, upgrade the test
        # expect( find('#mech-bug-list')[:href]).to eq(root_url + 'client_url_placeholder')
        
        @login_window = window_opened_by do
          find('#mech-bug-list').click
        end
      end

      within_window @login_window do
        expect(find('.sign-in-submit').value).to eq('Sign in')
      end
    end
  end

end