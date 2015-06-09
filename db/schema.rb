# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150609192917) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: true do |t|
    t.boolean  "is_project_manager"
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bugs", force: true do |t|
    t.integer  "project_id",                       null: false
    t.string   "url"
    t.string   "browser"
    t.string   "status",          default: "Open"
    t.string   "params"
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "browser_version"
    t.string   "os"
    t.string   "ua"
    t.string   "name"
    t.text     "description"
    t.integer  "admin_id"
    t.float    "time_spent"
  end

  add_index "bugs", ["admin_id"], name: "index_bugs_on_admin_id", using: :btree

  create_table "clients", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "clients", ["email"], name: "index_clients_on_email", unique: true, using: :btree
  add_index "clients", ["reset_password_token"], name: "index_clients_on_reset_password_token", unique: true, using: :btree

  create_table "comments", force: true do |t|
    t.integer  "bug_id"
    t.integer  "admin_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["admin_id"], name: "index_comments_on_admin_id", using: :btree
  add_index "comments", ["bug_id"], name: "index_comments_on_bug_id", using: :btree

  create_table "projects", force: true do |t|
    t.string   "name"
    t.string   "blurb"
    t.integer  "client_id"
    t.date     "expiration"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active"
    t.integer  "admin_id"
    t.string   "git_repo_url"
    t.string   "dev_server_url"
  end

  add_index "projects", ["admin_id"], name: "index_projects_on_admin_id", using: :btree

end
