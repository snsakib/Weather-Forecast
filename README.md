# Overview

"Weather Forecast" is a basic weather app developed with Angular. Upon submitting your location, the app will display the temperature within a chart.

# Technologies Implemented

1. Angular
2. D3.js
3. TypeScript
4. RxJS
5. RESTful API Integration
6. HTML5
7. CSS3
8. Sass
9. Bootstrap

# Why I Did This Project?

1. To have a practical experience on how to **integrate RESTful APIs with Angular**
2. To learn **data visualization with D3.js**

# Challenges

### Drawing the chart with D3.js

Since, It was my first project with D3.js, It was very challenging to grasp the underlying concepts. After days of surfing the web & reading lots of blog posts, I was able to draw the chart. (I know! I know! the chart is not a good looking one)

# Development Process

1. Planning:
Among lots of free weather APIs, I chose to work with [OpenWeatherMap API](https://openweathermap.org/api). Since this is just a demo project, I decided to display only the temperature data.
2. Integrating the API with Angular:
I build [this Angular service](https://github.com/snsakib/Weather-Forecast/blob/master/src/app/forecast.service.ts) to retrieve the weather data from the server. Then, I use that service to integrate data into my chart.
3. Drawing the chart with D3.js
It was the hardest yet most educative part of the project. After a few days of coding, I was able to render the chart properly into the webpage.

# My Top Takeaways

1. Angular & RESTful API
After completing this project I now know how to integrate a RESTful API with an Angular project
2. Learning the D3.js fundamentals
Upon completing the project I can now understand the D3.js. I now know the possibilities and I'm now eagerly waiting to explore the other features

# Future Scope

1. To display more weather info & icons
