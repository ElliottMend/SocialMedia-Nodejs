# Social Media Site

Social media site built using React, Express/Node, Typescript, and PostgreSQL. currently allows you to make posts, like other people’s posts, comment on other people’s posts, follow other users, has proximity-based post searching, and allows you to see other users’ profiles (which contains their image "About Me" section and location).


## Design Decisions

### Initial Purpose
	
Initially this started off as wanting to build my first large project (one that fully integrated front and backend, more so than a simple API) I had also wanted to use it as an excuse to learn React as it seemed to be a very popular and well-regarded library. Coming from Vuejs and learning React was surprisingly easy, partially because it is more barebones but also because the design principles really make sense and make visualizing the application easier. The end goal of this project is to make a sufficiently useful product that properly utilizes React, abides by Reacts best practices, and utilizes a lot of its features and external libraries.

### Frontend

Obviously since the goal of the project was to learn React it only makes sense that I use react as the frontend stack, along the way I had learned a significant amount about React and went from making a basic parent-child application to a fleshed out well designed application. 
One of the most important things I learning while building this was React hooks and how to properly integrate and manage them, it was a complete game changer and made building it a lot more fun and easier. Because I wanted to build a fleshed-out project, I also learned quite a bit about things like cookies, tokens, HTTP requests, routing, CSS post-processing, and even Typescript.

### Backend

Since I was working with JavaScript on the frontend it made sense to use JavaScript on the back as well, after doing some research it seemed like ExpressJS was the most popular framework used for building webservers. Along with following the trends of just choosing the most popular technology to use I also decided on MongoDB as at the time I had only a little experience with SQLite and wasn’t very knowledgeable about databases. However, after sometime I had realized that not only was a SQL based database a better fit, but I was also improperly using MongoDB and it more closely resembled a relational database so I migrated to PostgreSQL.

This repo is for the node backend, the React front end code can be found here: https://github.com/ElliottMend/SocialFront
