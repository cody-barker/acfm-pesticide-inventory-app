# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(
    username: "test",
    password: "test"
)

garlon = Product.create!(
  name: "Garlon 3a",
  epa_reg: "62719-37"
)

aquaneat = Product.create!(
  name: "AquaNeat",
  epa_reg: "228-365"
)

competitor = Product.create!(
  name: "Competitor",
  epa_reg: ""
)

hilight = Product.create!(
  name: "Hi-Light",
  epa_reg: ""
)

container1 = User.find(1).containers.create!(
  shelf: 1,
  row: "A"
)

container2 = User.find(1).containers.create!(
  shelf: 1,
  row: "B"
)

container3 = User.find(1).containers.create!(
  shelf: 2,
  row: "A"
)
  
container4 = User.find(1).containers.create!(
  shelf: 2,
  row: "B"
)

contents1 = Content.create!(
  container_id: 1,
  product_id: 1,
  concentration: 2
)

contents2 = Content.create!(
  container_id: 1,
  product_id: 2,
  concentration: 2
)

contents3 = Content.create!(
  container_id: 1,
  product_id: 3,
  concentration: 1
)

contents4 = Content.create!(
  container_id: 1,
  product_id: 4,
  concentration: 0.5
)