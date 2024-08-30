# Create Users
user = User.create!(
  username: "acfm",
  password: "test"
)

# Create Products
products = Product.create!(
  [
    { name: "Garlon 3a", epa_reg: "1234-5678" },
    { name: "Aquaneat", epa_reg: "2345-6789" },
    { name: "Competitor", epa_reg: "3456-7890" },
    { name: "Hi-Light", epa_reg: "4567-8901" }
  ]
)

# Create Teams
teams = Team.create!(
  [
    { name: "Team 1", user_id: user.id },
    { name: "Team 2", user_id: user.id },
    { name: "Team 3", user_id: user.id },
    { name: "Team 4", user_id: user.id },
    { name: "Team 5", user_id: user.id },
    { name: "Team 6", user_id: user.id },
    { name: "Team 7", user_id: user.id },
    { name: "Support Team 1", user_id: user.id },
    { name: "Support Team 2", user_id: user.id },
    { name: "Support Team 3", user_id: user.id },
    { name: "Support Team 4", user_id: user.id },
    { name: "Facilities", user_id: user.id }
  ]
)


# Assign teams to user
user.teams << teams

# Create Containers
containers = Container.create!(
  [
    { team_id: teams.first.id, shelf: 1, row: "A", created_at: 1.month.ago, expires: 1.year.from_now },
    { team_id: teams.first.id, shelf: 1, row: "B", created_at: 2.months.ago, expires: 1.year.from_now },
    { team_id: teams.second.id, shelf: 2, row: "C", created_at: 3.months.ago, expires: 1.year.from_now }
  ]
)

# Add Contents to Containers
containers.each do |container|
  case container.id
  when containers.first.id
    container.contents.create!(product_id: products.first.id, concentration: 1.0)
    container.contents.create!(product_id: products.second.id, concentration: 2.5)
  when containers.second.id
    container.contents.create!(product_id: products.third.id, concentration: 3.0)
    container.contents.create!(product_id: products.fourth.id, concentration: 4.5)
  when containers.third.id
    container.contents.create!(product_id: products.first.id, concentration: 5.0)
    container.contents.create!(product_id: products.second.id, concentration: 1.5)
  end
end

# Create Creation Logs
CreationLog.create!(
  [
    { team_id: teams.first.id, container_id: containers.first.id },
    { team_id: teams.first.id, container_id: containers.second.id },
    { team_id: teams.second.id, container_id: containers.third.id }
  ]
)
