# E-Commerce Back End 
  ## table of contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contribution](#contribution)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Description 
  This application allows the user to use API requests to manage a database of products within MySQL. Through use of Insomia or a functional equivalent, requests can be made to create, delete, view, or update products, categories, tags, and product tags within the database. As is referenced in the title, this only includes the back end functions.
  [link to walkthrough video](https://youtu.be/_OFsbpHYEXw)

  ## Installation 
  Installation starts with downloading the zip file containing all of the files and extracting everything within. Next, the folder should be opened within visual studio code or a functional equivalent and through the command terminal, "npm init" should be entered, followed by "npm i" to install all of the necessary packages. From there, the server should be started using the command "node server.js" while within the E-Commerce-Back-End directory. Once the server is working, MySQL workbench should be opened and a new database should be created using the commands listed in the schema file within the db folder. Next, the command "node seeds/index.js" should be entered to seed the starting data within the database. Next using the loacal server address in inquirer, use any of the commands within the route files to test out if data is being added, deleted, modified, and viewed using the correspodin requests. 

  ## Usage 
  Once the application is fully set up, make sure the server is running as described within the installation instructions and use Insomnia to access the data however you see fit. Within Insomnia, any command that needs to identify a certain column within the database uses the id of the given column to address which one should be affected by the request. For adding new data, entering the body in json form is suggested and the seed files can be used to give an idea on the notation for each table.

  ## License 
  the unlicense :
  A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.

  ## Contribution 
  Sam Bergeland

  ## Tests 
  Once set up, use any of the requests within Insomnia to test how the seeded data or new data responds within MySQL.

  ## Questions 
  Find me at Github under [samb56](https://github.com/samb56)

  contact me at:
  [sambergeland@gmail.com](mailto:sambergeland@gmail.com)
