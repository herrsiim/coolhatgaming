# Suggestions
The navigation bar's categories should come as an separate request. At the moment I have to filter out all available categories based on the all games request. This isn't that efficient as if they could be requested from a single source and skip the filtering functions to show only one category.

If I have to filter all categories from the games array, the ordering of these items will be random. As for the design, it shows, that "Top Games" and "New Games" should be in the front. So I have to manually get them from array and put them into the front of array and also rename them ("New" -> "New Games" and "Top" -> "Top Games"). Maybe a separate request to get the game categories should be made available via the backend side which returns display name and category type. 

## Color palette
The color palette consists of 4 colors (referenced from the FE. technical test).
* #8DC63F
* #373737
* #FFFFFF
* #FCFCFC

Note to the design doc. creator: 
#FFFFFF and #FCFCFC are indistinguishable to the human eyes. I will use only one #FFFFFF for the test task.  

# Bugs
1. Image broken http://stage.whgstage.com/scontent/images/games/NYXJACKPOTJESTER50000.jpg

# TODO's
1. Modify games array category

# Guestions
1. Where are pngs?
2. What would be the first "default" view when the user enters the page.
3. What would be the "default" for broken game image, fallback image.