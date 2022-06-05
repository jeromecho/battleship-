# battleship-
Exercising TDD with Jest and first React.js project 

## Technical Challenges 

While trying to get my test suites to work, I found that testing the results of query messages were not working due to _.toEqual_ not behaving as I had expected.
I found a workaround by converting both received and expected objects to JSON strings with the logic that should the JSON strings match, the original contents of the
objects should have also been the same, which was what was needed for my project to run. 


