CREATE DATABASE FlatBuddies;

USE FlatBuddies;

CREATE TABLE users(
	user_id int(10) NOT NULL,
	first_name varchar (50) NOT NULL,
	last_name varchar (50) NOT NULL,
	dob date NOT NULL,
	gender varchar(50) NOT NULL,
	politics varchar(50) NOT NULL,
	religion varchar(50) NOT NULL,
	country varchar(50) NOT NULL,
	job varchar(50) NOT NULL,
	bio varchar(600) NOT NULL
);

CREATE TABLE login(
    user_id int(10) NOT NULL,
	email varchar (50) NOT NULL,
	password varchar (50) NOT NULL
);

CREATE TABLE preferences(
	user_id int(10) NOT NULL,
	location varchar(50) NOT NULL,
	p_age varchar(50) NOT NULL,
	noise varchar(50) NOT NULL,
	p_gender varchar(50) NOT NULL,
	cleanliness varchar(200) NOT NULL,
	smoking varchar(50) NOT NULL,
	alcohol varchar(50) NOT NULL,
	groceries varchar(50) NOT NULL,
	schedule varchar(50) NOT NULL,
	pets varchar(50) NOT NULL,
	guests varchar(200) NOT NULL,
	p_religion varchar(50) NOT NULL,
	p_politics varchar(50) NOT NULL,
	p_country varchar(50) NOT NULL
);
	

CREATE TABLE chats(
	chat_id int(10) NOT NULL,
	message varchar (350) NOT NULL, 
	timestamp datetime NOT NULL, 
	sender_id int(10) NOT NULL,
	recipient_id int(10) NOT NULL
);

CREATE TABLE reviews(
	review_id int(10) NOT NULL,
	review varchar(350) NOT NULL, 
	review_date date NOT NULL, 
	user_id int(10) NOT NULL
);




-- ADD PRIMARY KEYS --

ALTER TABLE users
ADD CONSTRAINT user_pri
PRIMARY KEY (user_id);

ALTER TABLE login
ADD CONSTRAINT login_pri
PRIMARY KEY (user_id);

ALTER TABLE preferences
ADD CONSTRAINT pref_pri
PRIMARY KEY (user_id);

ALTER TABLE chats
ADD CONSTRAINT chat_pri
PRIMARY KEY (chat_id);

ALTER TABLE reviews
ADD CONSTRAINT rev_pri
PRIMARY KEY (review_id);




-- FOREIGN KEYS --
ALTER TABLE preferences
ADD CONSTRAINT pref_for
FOREIGN KEY (user_id)
REFERENCES users (user_id);

ALTER TABLE login
ADD CONSTRAINT login_for
FOREIGN KEY (user_id)
REFERENCES users (user_id);

ALTER TABLE chats
ADD CONSTRAINT chat_for1
FOREIGN KEY (sender_id)
REFERENCES users(user_id);

ALTER TABLE chats
ADD CONSTRAINT chat_for2
FOREIGN KEY (recipient_id)
REFERENCES users(user_id);

ALTER TABLE reviews
ADD CONSTRAINT rev_for
FOREIGN KEY (user_id)
REFERENCES users(user_id);


-- ADD DATA --

-- USERS TABLE --

INSERT INTO users (user_id, first_name, last_name, country, dob, gender, politics, religion, job, bio) VALUES
(13436, "Alice", "Ahmad", "United Arab Emirates", "2001-09-25", "Female", "Prefer not to say", "Muslim", "Part Time Student and Retail Worker", "Hi everyone! I'm Alice, and I’m a part-time law student currently studying in London. I'm searching for the perfect roommate to share a space…and expenses with. As someone who values quiet study time, I'm seeking a tranquil living space where I can dive into my studies without distraction. Living on a student budget means splitting costs is key, but I also value a harmonious and respectful living environment. When I'm not buried in case law, you can find me exploring the city's nooks and crannies or unwinding with a good book. Looking forward to finding a new roomie! :)"),
(27476,"Matthew" ,"Simpson", "United Kingdom","1992-08-01","Male" ,"Liberal", "Prefer not to say", "Marketing Director","Hey, I'm Matt, and I'm on the lookout for a flatmate in the heart of London. I work in digital marketing and when I'm not glued to my laptop screen, you'll likely find me out and about with Rex (my doggo). As a proud pet owner, creating a cosy and pet-friendly living space is a top priority for me. I enjoy discovering hidden gems in the city, trying out new restaurants, and immersing myself in London's diverse culture. If you're on the hunt for a flatmate who brings energy, reliability and a furry friend into the mix, I could be the perfect match!"),
(34786,"Margaret" ,"Johnson", "United Kingdom","1972-01-15","Female" ,"Prefer not to say", "Prefer not to say", "Childcare Worker","Hello there! My name is Margaret. By day, I'm immersed in the world of childcare, where my heart truly lies. With a passion for nurturing young minds, I bring warmth, responsibility, and a sense of joy to everything I do. I'm not just searching for a place to live, but a place to call home—a space where I can unwind and foster a sense of community after a fulfilling day of work. I value open communication and mutual respect in shared living spaces. In my downtime, you'll find me exploring museums, parks, and cafes, soaking up all that London has to offer!"),
(23436, "Celine", "Moreau", "France", "1997-08-16", "Female", "Liberal", "Spiritual but not religious", "Freelancer Interior Designer", "Bonjour! I'm Celine, a French freelance interior designer, now seeking a cosy and social living space in London. I am a Leo, and although I prefer a quiet environment at home, I am also a social being open to having fun with my flatmates and the occasional drink! I enjoy meditation, yoga, photography, watching films, discovering new art exhibitions, and going out for brunch (or any other meal, really, haha). Let’s get in touch and see if we are a good fit!"),
(23067, "Blair", "Brown", "United Kingdom", "1991-02-12", "Female", "Liberal", "None", "Fashion Designer", "Hello there! I'm Blair, a fashion designer from Scotland who recently made the leap to London. When I'm not sketching new designs or exploring the fashion scene, you'll find me soaking up the culture of London's diverse neighbourhoods or unwinding with a good book in a cosy cafe. If you're looking for a friendly and easygoing flatmate to share laughs with, let's chat!"),
(71098, "Cameron" , "Hunt", "Pakistan","2001-02-10","Male","Prefer not to say ", "Muslim","Freelance Web Developer","I'm Cameron, a web developer residing in a cosy apartment in the city. I have a penchant for simple pleasures like tending to my plants and savouring a good cup of coffee. I find joy in immersing myself in nature, capturing moments through photography, indulging in culinary adventures, and losing myself in the melodies of music. Contributing to my community through volunteering is also something that brings me great satisfaction. My life is a delightful blend of coding endeavours and enriching hobbies, ensuring each day is brimming with excitement and fulfilment."),
(71214, "William", "James", "United Kingdom", "1992-04-07","Male","Conservative", "Spiritual but not religious", "Banker", "Hi! I'm William and I'm currently on the hunt for a housemate. When I'm not buried in numbers at work, I immerse myself in the captivating realms of literature, often venturing out on quests to explore various libraries. I derive immense pleasure from uncovering hidden gems in the culinary world, visiting historic landmarks, and indulging in spontaneous road trips. My vibrant lifestyle and fervent passion for exploration make me the perfect roommate for those seeking a blend of excitement and relaxation in their home life."),
(77577,"Kelvin", "Smith", "United Kingdom","1983-01-01", "Male", "Conservative", "None", "Bar manager", "I'm Kelvin, a friendly bar manager living in a cosy small studio apartment. Right now, I'm hoping to find a flatmate to share this space with. I really enjoy crafting delicious drinks and making the bar feel welcoming for everyone. Outside of work, I like trying out new foods, reading, and spending time outdoors. I'm pretty easygoing, so I think I'd make a great flatmate for anyone who wants a mix of relaxation and adventure in their living space."),
(43219, "Mei", "Wong", "Taiwan", "2002-03-05", "Female", "Prefer not to say", "None", "Full-Time Student", "Hello! My name is Mei Wong and I am an international Full-Time Student attending the University of Roehampton. I am a quiet, studious student looking for a flatmate near where I go to school. I am from Taiwan and enjoy eating Taiwanese cuisine. Some of my hobbies include reading, taking walks in nature, and exploring museums. If you're also seeking a peaceful and welcoming living environment, let's connect! I'm excited to find a flatmate who shares similar values and interests." ),
(56789, "Blessing", "Abiola", "Nigeria", "2004-12-29", "Female", "Prefer not to say", "Protestant", "Full-Time Student", "Hi! I'm Blessing, an international student from Nigeria. When I'm not studying, I like exploring London and cooking meals from my home country. If you're seeking a flatmate who values peace and friendship, then I'm your perfect match!"),
(45434 ,"James", "Beck", "United Kingdom", "1997-04-14", "Male", "Liberal", "None", "Musician", "Hey there! I'm James, a 26-year-old musician hailing from Bristol and currently rocking it out in London. I’m looking for flatmates who not only share my passion for music but also understand the importance of fostering a creative living environment. When I'm not strumming away on my guitar, you'll find me exploring London's vibrant music scene or catching up with friends over a pint at the local pub. If you're on the hunt for a flatmate who's laid-back, music-loving, and always up for a jam session, then look no further!"),
(45324, "Luke", "Martin", "United Kingdom", "1999-05-04", "Male", "Liberal", "None", "Assistant Finance Manager", "Hey there! I'm Luke, a 24-year-old native Londoner. I’m an assistant finance manager, but on weekends, you'll find me exploring the city's vibrant streets and soaking in the diverse culture around me. Whether it's trying out new foods, catching up with friends at a local cafe, or diving into a good book, I'm all about enjoying life's little pleasures. If you're looking for a friendly, easygoing flatmate to share laughs and good times with, then let's chat!");


INSERT INTO login (email, password, user_id) VALUES
("alice@myuni.ac.uk", "LaWsTudent123", 13436),
("matt_simp@gmail.com", "Rex$35", 27476),
("maragret_johnson@outlook.com", "password123", 34786),
("celinemore@gmail.com", "HT97itme!", 23436),
("blbrair@icloud.com", "DsIng212.", 23067),
("camhunt710@outlook.com","Cam@Hunt@710", 71098), 
("williamJ214@gmail.com","Will@james", 71214),
("kelvins77@gmail.com","kelmith_@77", 77577),
("wongmei02@gmail.com", "cmDcHkzUUx", 43219),
("blessing.abiola@gmail.com", "U93z5G7jKw", 56789),
("jamesbeck@gmail.com", "Gui2ar27", 45434),
("luketmartin@gmail.com", "Belgium4", 45324);


INSERT INTO preferences (user_id, location, p_age, noise, p_gender, cleanliness, smoking, alcohol, groceries, schedule, pets, guests, p_religion, p_politics, p_country) VALUES
(27476, "SE London", "25-34", "No Preference", "No Preference", "I am clean and somewhat organized", "No Preference", "No Preference", "No", "Flexible Schedule", "Pets", "We should only have people over during the weekends", "No Preference", "No Preference","No Preference"),
(13436, "SW London", "18-24", "Quiet", "All Female Flat", "I am organised, but I would like to hire someone to do the cleaning","No Smoking", "No Preference", "Yes", "Part Time Student", "No Preference", "We should be allowed to bring anyone at any time", "Yes", "No Preference", "No Preference"),
(34786, "N London", "18-24", "No Preference", "All Female Flat", "I don’t mind it being unorganised and I would like to hire a cleaner","Smoking Allowed", "No Drinking", "No", "Schedule varies day-to-day", "No Preference", "We should be allowed to bring anyone at any time", "No Preference", "No Preference", "No Preference"),
(23436, "NE London", "25-34", "Quiet", "All Female Flat", "I am very clean and organised", "No Smoking", "No Preference", "No", "Schedule varies day-to-day", "No Preference", "No guest should stay for longer than 3 nights/week, unless we have discussed it", "No Preference", "Yes", "No Preference"),
(23067, "No Preference", "25-34", "No Preference", "No Preference", "I am organised, but I would like to hire someone to do the cleaning", "No Smoking", "No Preference", "No", "Standard 9 am to 5 pm", "No Preference", "We should be allowed to bring anyone at any time", "No Preference", "Yes", "No Preference"),
(71098, "SW London" , "18-24" , "Quiet" , "No Preference", "I am clean and somewhat organised", "Smoking Allowed" , "Drinking Allowed", "Yes" , "Work From Home","No Pets", "We should only have people over during the weekends", "No Preference", "No Preference", "Yes"),
(71214 , "No Preference" , "25-34" , "Quiet","All Male Flat","I am clean and organised","Smoking Allowed","Drinking Allowed","Yes","Standard 9 am to 5 pm","Pets","No guests at all unless we have discussed it","No Preference","No Preference", "No Preference"),
(77577,"Central London", "25-34", "No Preference","No Preference","I am clean and organised", "Smoking Allowed","Drinking Allowed","Yes","Flexible Schedule","No Pets","We should be allowed to bring anyone at any time", "No Preference","No Preference", "No Preference"),
(43219, "SW London", "18-24", "No Preference", "All Female Flat", "I am clean and organised", "No Smoking", "No Preference", "Yes", "Full-time Student", "No Preference", "We should only have people over during the weekends", "No Preference", "No Preference", "No Preference"),
(56789, "SW London", "18-24", "No Preference", "No Preference", "I am clean and somewhat organised", "No Preference", "No Preference", "Yes", "Full-time Student", "Pets", "We should be allowed to bring anyone at any time", "Yes", "No Preference", "No Preference"),
(45434, "SW London", "No Preference", "No Preference", "No Preference", "I am clean and somewhat organised", "Smoking Allowed","Drinking Allowed","No","Flexible Schedule", "No Preference","We should be allowed to bring anyone at anytime", "No Preference", "Yes", "No Preference"),
(45324, "NE London", "No Preference", "No Preference", "No Preference", "I am clean and organised", "No Smoking", "No Preference", "No", "Standard 9 am to 5 pm", "No Preference", "We should be allowed to bring anyone at anytime", "Yes", "Yes", "No Preference");




INSERT INTO chats (chat_id, message, timestamp, sender_id, recipient_id) VALUES
(00001, "Hey buddy!", "2023-02-02 12:34:25", 23067, 77577),
(00002, "Hi!", "2023-06-02 12:30:25", 13436, 45434),
(00003, "Hey! How's it going? 😄", "2021-01-02 13:30:25", 27476, 13436),
(00004, "Hey there! I'm good, thanks! How about you?", "2023-11-02 14:58:02", 13436, 27476),
(00005, "I'm doing well, just taking a break from work. So, tell me a bit about yourself. What do you do for fun?", "2023-02-02 15:24:14", 27476, 13436),
(00006, "Hi Blair! I see that we would both be new to the city, I am so excited to move! How about you?", "2023-12-16 16:04:15", 23436, 23067),
(00007, "Hello Celine! I can’t wait to be there already, when do you think you will move? I am thinking about going to visit some flats after Christmas", "2023-12-16 17:10:20", 23067, 23436),
(00008, "I was also thinking about doing something similar, maybe we can do a video call to get to know each other, this is my phone number +33871898. Call me whenever you can! :)",  "2023-12-16 17:38:25", 23436, 23067);


INSERT INTO reviews (review_id, review, user_id, review_date) VALUES
(00001, "I love flat buddies!", 34786, "2023-03-12"),
(00002, "I recently moved to London and FlatBuddies has been a lifesaver in connecting me with potential flatmates who match my vibe!", 23067, "2023-03-13"),
(00003, "Thanks to FlatBuddies, I've found the perfect flatmate and a peaceful living arrangement near my university. I couldn't be happier with the outcome.", 56789, "2023-11-04"),
(00004, "I’ve been able to find awesome flatmates through FlatBuddies who share my love for music and understand my need for a creative living environment.", 45434, "2024-02-20");








