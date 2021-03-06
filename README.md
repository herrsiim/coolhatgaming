# Notes

Once the project has been cloned, run `npm install` to install all the dependencies.

`npm start` will start the project in development mode.

`npm run build:prod` will generate minified project into `Dist/` folder. If debuggable build is needed, simply run `npm run build`.

## Navigation bar items
The navigation bar categories should come as an separate request. At the moment I have to filter out all available categories based on the all games request. This isn't that efficient as if they could be requested from a single source and skip the filtering functions to show only one category.

If I have to filter all categories from the games array, the ordering of these items will be random (first come, first serve). As for the design, it shows, that "Top" and "New" should be in the front. 

So I have to (1)manually get them from array and put them into the front of array and (2)also rename them ("New" -> "New Games" and "Top" -> "Top Games"). 

Maybe a separate request to get the game categories should be made available via the backend side which returns display name and category type? 🤔

## Navigation bar mobile view
The single design image provided to me didn't contain any information on how the menu should look on mobile devices, so went ahead and made a custom solution by myself.

## New & Top ribbons
Because the ribbons for "new" and "top" were not provided, I decided to use a simple ribbon without a text for image. Why? Because this will keep the app future proof, for example, if we would need to translate the app, then we only need to add text strings, instead of adding separate images for different language ribbon pngs.

### Ribbon displaying 
* If one game has both then the "Top" one will rule over "New".
* If selected category is "New" then we only show "Top" ribbon and vice versa

## Play button
Play button was not shown on the design guide so I created it by myself.

## Color palette
The color palette consists of 4 colors (referenced from the FE. technical test).
* #8DC63F
* #373737
* #FFFFFF
* #FCFCFC

Note to the design doc. creator: 
#FFFFFF and #FCFCFC are indistinguishable to the human eyes. I will use only one #FFFFFF for the test task.  

## Broken images
It seems that there is one broken image in the games list: 
http://stage.whgstage.com/scontent/images/games/NYXJACKPOTJESTER50000.jpg

I created a custom image for broken images, so it wouldn't break the layout and it would look nice to the end user.