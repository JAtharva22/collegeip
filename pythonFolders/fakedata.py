from faker import Faker
import random

fake = Faker()

# Define the statements and options
statements = [
    "The night life and glamour of the Mumbai city attracted you to come here",
    "Lack of development in your home town forced you to come to Mumbai.",
    "Mumbai city has more opportunities than compared to other cities in India",
    "Your desire of becoming a movie star or rich person brought you in this city",
    "Your standards of living have improved after coming to Mumbai.",
    "You are able to make sufficient savings for your future",
    "You are happy living in Mumbai",
    "You are able to fulfill your family needs",
    "Finding a house to live in Mumbai city is difficult.",
    "High rent and expensive lifestyle of Mumbai city affects you.",
    "It is comfortable to travel in Mumbai’s public transport.",
    "Survival is difficult in Mumbai",
    "You will go back to your hometown and leave this city if given a chance",
    "Mumbai city has matched your expectations",
    "Do people need good social connections to be successful in Mumbai?",
    "According to you, Is Mumbai really a city of dream?"
]

options = ["option 1", "option 2", "option 3", "option 4", "option 5"]

# Generate 50 rows of fake data
data = []
for _ in range(50):
    row = [fake.sentence() for _ in statements]
    row.append(random.choice(options))
    data.append(row)

# Print the generated data
for row in data:
    print(row)
