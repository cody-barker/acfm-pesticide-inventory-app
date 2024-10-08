# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_09_03_234400) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "containers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "shelf"
    t.string "row"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "expires"
    t.integer "team_id"
    t.index ["team_id"], name: "index_containers_on_team_id"
  end

  create_table "contents", force: :cascade do |t|
    t.integer "container_id"
    t.integer "product_id"
    t.float "concentration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "creation_logs", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "team_id"
    t.integer "container_id"
    t.index ["container_id"], name: "index_creation_logs_on_container_id"
    t.index ["team_id"], name: "index_creation_logs_on_team_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "epa_reg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
