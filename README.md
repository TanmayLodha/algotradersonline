# algotradersonline
This is an algorithmic trading website that offers various strategies to execute in Indian stock market. It also offers a very robust paper trading test these strategies and mechanism to directly execute these strategies to their demat account.

## Site Link
www.algotradersonline.com

## General Information
<ul>
<li>Made with React and Django. This project implements a paper trading section, an option chain section and a summary tab where a user can look into all the trades they did with us. A user can also directly place orders to their demat account via Aliceblue.com.</li>
</ul><ul>
<li>The purpose of this project was to provide useful strategies to a new trader.</li>
</ul>

## Technologies Used
<ul>
<li>React</li>
<li>Django</li>
<li>DRF</li>
</ul>

## Features
<ul>
<li>User Login/Registration</li>
<li>Personalised Summary Tab</li>
<li>Execute strategy directly to user's demat account</li>
<li>Paper trading</li>
<li>View Options data</li>
</ul>

## Setup
For backend, you can find all the dependencies in <code>requirements.txt</code> in root folder. For frontend, you can find all the dependencies in <code>package.json</code> in it's root folder

### Steps
<ul>
<li>Download or clone the repository</li>
<li>create a folder "day_data" in this root directory. This will store candle data</li>
<li>change your directory to frontend</li>
<li>run <code>npm i</code> and then run <code>npm start</code> </li>
<li>You will now just need to change "BASEURL" in <code>BaseURL.js</code> to your development's URL</li>
<li>Frontend is good to go</li>
<li>Change directory to backend</li>
<li>pip install <code>requirements.txt</code></li>
<li>There are few files where you NEED to change file path to match your local directory.</li>
<li>Like <code>1_min_candle.py</code>, <code>5_min_candle.py</code>, and all files in <code>strategiesAPI/scripts</code></li>
<li>run python manage.py runserver</li>
<li>Now navigate to admin (URL/admin) panel change file path for every strategy in "Strategies" tab</li>
<li>You are now good to go :)</li>
</ul>

## Project Status
In Progress. We are just a team of 4 students.
