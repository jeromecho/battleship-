# battleship-
Exercising TDD with Jest and first React.js project 

## Pictures

![image](https://user-images.githubusercontent.com/71617542/174661643-4f595f4b-0c80-4e47-afa0-287430a5b8b1.png)
![image](https://user-images.githubusercontent.com/71617542/174661868-f3ceacf2-b52e-4af1-947e-2c934c86f2fb.png)
![image](https://user-images.githubusercontent.com/71617542/174661893-2a5592fa-97bd-4126-8f8e-3fd3b365444d.png)
![image](https://user-images.githubusercontent.com/71617542/174661959-58d608f1-e9e6-4fa7-af51-0ed9b75f3c6c.png)

## Technical Challenges 

- Having both onClick and onDoubleClick on my Gameboard component. I didn't want to have onClick run accidentally when I only wanted onDoubleClick to run. I found a workaround by rendering a different Gameboard depending on the stage of the application I was on - one Gameboard only had an onClick handler while the other only had a onDoubleClickHandler
- Learning and implementing the HTML Drag and Drop API. Learning to quickly implement the API seemed challenging, but was relatively easy to pick up and integrate with React. 
- Finding what tests to use. I walked in with no idea of TDD. I initially tested for equality between strings as a way of testing if the 'return value' was as expected for query messages. This turned out to be ineffective, however, and was pretty much just testing implementation as opposed to functionality. I later erased these tests and focused more on testing the expected functionality of utilities exposed in the public interface 

## Reflection 

This was my biggest and most complex project yet with several thousand lines of code, but I found it to be the easiest to code. TDDing the logic definiately made the architecture of the project less of a headache later on. Furthermore, I really liked React's way of managing state and maintaining data flows through props and handlers. On the whole, my code felt a lot more modular and there was little 'hacking' done until near the end of the project. I learned a ton. 
