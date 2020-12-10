/*

The Game Project 6 - Adding game mechanics

*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var scrollPos;
var canyon;
var collectable;
var mountain;
var cloud;
var treePos_x;
var treePos_y;
var trees_x;
var gameChar_world_x;
var game_score;
var flagpole;
var lives;
var platforms;
var enemies;



function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    lives = 4;
    
    startGame();


}

function draw() {
    background(25, 25, 112); // fill the sky blue
    noStroke();
    fill(85, 107, 47);
    rect(0, floorPos_y, width, height / 4); // draw some green ground

    
    push();
    translate(scrollPos, 0);




    // Draw clouds.

    for (var i = 0; i < cloud.length; i++) 
    
    {
        drawClouds(cloud[i])
    };

    // Draw mountains.

    for (var i = 0; i < mountain.length; i++) 
        
    {
        drawMountains(mountain[i])
    };

    // Draw trees.

    for (var i = 0; i < trees_x.length; i++) 
    
    {
        drawTrees(trees_x[i])
    };
    // Draw canyons

    for (var i = 0; i < canyon.length; i++) 
        
    {
        drawCanyon(canyon[i]);
    };

    // Draw collectable items

    for (var i = 0; i < collectable.length; i++)
    
    {
        drawCollectable(collectable[i])
    };

    renderFlagpole();


    for (var i = 0; i < platforms.length; i++)
        
    {
        platforms[i].draw();
    }

    for (var i = 0; i < enemies.length; i++) 
    
    {
        enemies[i].update();
        enemies[i].draw();
        
        if (enemies[i].isContact(gameChar_world_x, gameChar_y)) 
            
        {
            startGame();
            break;
        }

    }

    pop();
    drawGameChar();

    //draw screen text

    fill(255, 215, 0);
    text("score: " + game_score, 20, 20);
    text("lives: ", 20, 37);

    for (i = 0; i < lives; i++)
        
    {
        fill(255, 215, 0);
        strokeWeight(2);
        rect(50 + 20 * i, 25, 15, 15)
    }

    if (lives < 1) 
    
    {
        push();
        fill(255, 0, 0);
        textSize(30);
        text("GAME OVER !!! PRESS SPACE TO CONTINUE", width / 2 - 400, height / 2);
        pop();

        return;
    }

    if (flagpole.isReached) 
    
    {
        push();
        textSize(30);
        text("LEVEL COMPLETE. PRESS SPACE TO CONTINUE", width / 2 - 400, height / 2);
        pop();

        return;
    }

    // Logic to make the game character move or the background scroll.

    if (isLeft) 
    
    {
            
        if (gameChar_x > width * 0.2) {
            gameChar_x -= 4;
        } 
        
        else 
            
        {
            scrollPos += 5;
        }
    }

    if (isRight) 
    
    {
            
        if (gameChar_x < width * 0.8) 
        
        {
            gameChar_x += 4;
        } 
            
        else 
            
        {
            scrollPos -= 5; // negative for moving against the background
        }
        
    }

    // Logic to make the game character rise and fall.

    if (gameChar_y < floorPos_y)

    {

        var isContact = false;


        for (var i = 0; i < platforms.length; i++)

        {
            if (platforms[i].checkContact(gameChar_world_x, gameChar_y)
                
                ==
                true) 
            
            {

                isContact = true;
                break;

            };

        }

        if (isContact == false) 
        
        {


            gameChar_y += 2;
            isFalling = true;
            
        } else 
        
        {

            isFalling = false;

        }

    } else 
    
    {

        isFalling = false;

    }

    if (isPlummeting)

    {

        gameChar_y += 5;

    }

    if (flagpole.isReached != true) 
    
    {
        
        checkFlagpole();

    }


    if (gameChar_y > height && lives > 0) 
    
    {
        startGame();
    }



    // Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;

}


// ---------------------
// Key control functions
// ---------------------


function keyPressed() 

    {

    if (flagpole.isReached && key == ' ') 
    
    {
        nextLevel();
        return
    } 
    
    else if (lives == 0 && key == ' ') 
    
    {
        returnToStart();
        return
    }


    // if statements to control the animation of the character when
    // keys are pressed.

    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);


    //37 == left
    //39 == right
    //32 == jump

    if (keyCode == 37) 
        
    {
        isLeft = true;
        console.log("isLeft:" + isLeft);
    }

    if (keyCode == 39)
    
    {
        isRight = true;
        console.log("isRight:" + isRight);
    }

    console.log(scrollPos);

    if (keyCode == 32) 
    
    {
        console.log("isPlummeting:" + isPlummeting)

        if (!isFalling) 
        
        {
            gameChar_y -= 100;
        }
    }

}

function keyReleased() 

{
    // if statements to control the animation of the character when
    // keys are released.
    //
    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (keyCode == 37)
    
    {
        isLeft = false;
        console.log("isLeft:" + isLeft);
    }

    if (keyCode == 39) 
    
    {
        isRight = false;
        console.log("isRight:" + isRight);
    }

    if (keyCode == 32)
    
    {
        isPlummeting = false;
        console.log("isPlummeting:" + isPlummeting)

        if (!isFalling) 
        
        {
            gameChar_y -= 100;
        }

    }
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.



function drawGameChar() 

{
    // draw game character



    if (isLeft && isFalling) 
    {
        // add your jumping-left code
        //head
        
        fill(72, 61, 139);
        ellipse(gameChar_x - 1, 
                gameChar_y - 67,
                20,
                20);
        
        //body
        
        fill(255, 69, 0);
        rect(gameChar_x - 7,
             gameChar_y - 57,
             15, 
             30,
             3);
        
        //left leg
        
        fill(0, 100, 0);
        rect(gameChar_x - 6,
             gameChar_y - 32,
             6,
             20);
        
        //right leg
        
        fill(0, 100, 0);
        rect(gameChar_x + 1,
             gameChar_y - 29,
             6, 
             28);
        
        //right hand
        
        fill(72, 61, 139);
        rect(gameChar_x - 11, 
             gameChar_y - 50,
             15,
             5);

    } 
    
    else if (isRight && isFalling) 
    
    {
        // add your jumping-right code

        //head
        
        fill(72, 61, 139);
        ellipse(gameChar_x + 2,
                gameChar_y - 67,
                20, 
                20);
        
        //body
        fill(255, 69, 0);
        rect(gameChar_x - 7,
             gameChar_y - 57, 
             15, 
             30,
             3);
        
        //left leg
        
        fill(0, 100, 0);
        rect(gameChar_x - 6, 
             gameChar_y - 29, 
             6,
             28);
        
        //right leg
        
        fill(0, 100, 0);
        rect(gameChar_x + 1,
             gameChar_y - 32,
             6,
             20);
        
        //right hand
        
        fill(72, 61, 139);
        rect(gameChar_x - 3,
             gameChar_y - 50,
             15,
             5);
    } 
    
    else if (isLeft) 
    
    {
        // add your walking left code

        //head
        
        fill(72, 61, 139);
        ellipse(gameChar_x - 1,
                gameChar_y - 66,
                20, 
                20);
        //body
        
        fill(255, 69, 0);
        rect(gameChar_x - 7,
             gameChar_y - 57, 
             15, 
             30,
             3);
        
        //left leg
        
        fill(0, 100, 0);
        rect(gameChar_x - 6, 
             gameChar_y - 32,
             6, 
             32);
        
        //right leg
        
        fill(0, 100, 0);
        rect(gameChar_x + 1,
             gameChar_y - 29, 
             6,
             32);
        
        //right hand
        
        fill(72, 61, 139);
        rect(gameChar_x + 5,
             gameChar_y - 53,
             5,
             20);
    } 
    
    else if (isRight)
    
    {
        // add your walking right code

        //head
        
        fill(72, 61, 139);
        ellipse(gameChar_x + 2,
                gameChar_y - 66,
                20, 
                20);
        //body
        
        fill(255, 69, 0);
        rect(gameChar_x - 7,
             gameChar_y - 57,
             15,
             30,
             3);
        //left leg
        
        fill(0, 100, 0);
        rect(gameChar_x - 6, 
             gameChar_y - 29,
             6,
             32);
        //right leg
        
        fill(0, 100, 0);
        rect(gameChar_x + 1,
             gameChar_y - 32,
             6, 
             32);
        //right hand
        
        fill(72, 61, 139);
        rect(gameChar_x - 9,
             gameChar_y - 53,
             5, 
             20);

    } 
    
    else if (isFalling || isPlummeting) 
    
    {
        // add your jumping facing forwards code
        
        //head

        fill(72, 61, 139);
        ellipse(gameChar_x,
                gameChar_y - 67,
                20, 
                20);
        
        //body
        
        fill(255, 69, 0);
        rect(gameChar_x - 10, 
             gameChar_y - 57,
             20, 
             30,
             3);
        
        //left leg
        
        fill(0, 100, 0);
        rect(gameChar_x - 10,
             gameChar_y - 27,
             8,
             27);
        
        //right leg
        
        fill(0, 100, 0);
        rect(gameChar_x + 2,
             gameChar_y - 27,
             8,
             17);
        
        //left hand
        
        fill(72, 61, 139);
        rect(gameChar_x - 15,
             gameChar_y - 53,
             5, 
             14);
        
        //right hand
        
        fill(72, 61, 139);
        rect(gameChar_x + 10,
             gameChar_y - 53,
             5,
             20);

    } 
    
    else 
    
    {
        // add your standing front facing code

        //head
        
        fill(72, 61, 139);
        ellipse(gameChar_x,
                gameChar_y - 67,
                20,
                20);
        
        //body
        
        fill(255, 69, 0);
        rect(gameChar_x - 10,
             gameChar_y - 57,
             20,
             30,
             3);
        
        //left leg
        
        fill(0, 100, 0);
        rect(gameChar_x - 10,
             gameChar_y - 27,
             8, 
             30);
        
        //right leg
        
        fill(0, 100, 0);
        rect(gameChar_x + 2,
             gameChar_y - 27,
             8,
             30);
        
        //left hand
        
        fill(72, 61, 139);
        rect(gameChar_x - 15,
             gameChar_y - 53,
             5,
             25);
        
        //right hand
        
        fill(72, 61, 139);
        rect(gameChar_x + 10,
             gameChar_y - 53,
             5, 
             25);

    }

}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds(clouds) 

{

    strokeWeight(0);
    fill(255, 255, 255);
    ellipse(clouds.x_pos + 50,
            clouds.y_pos - 30,
            200,
            70);
    
    fill(255, 255, 255, 100);
    ellipse(clouds.x_pos + 180,
            clouds.y_pos,
            250, 90);
    
    fill(255, 255, 255, 160);
    ellipse(clouds.x_pos + 250,
            clouds.y_pos,
            200,
            70);

    fill(255, 255, 255, 180);
    ellipse(clouds.x_pos + 500,
            clouds.y_pos,
            190,
            100);
    fill(255, 255, 255);
    ellipse(clouds.x_pos + 570,
            clouds.y_pos,
            150,
            70);
    fill(255, 255, 255, 200);
    ellipse(clouds.x_pos + 620,
            clouds.y_pos,
            170, 70);

}

// Function to draw mountains objects.

function drawMountains(mountains) {

    strokeWeight(1);
    fill(105, 105, 105);
    stroke(0, 0, 0);
    triangle(mountains.x_pos,
             432,
             mountains.x_pos + 250,
             432,
             mountains.x_pos + 125,
             200);

    fill(255, 250, 250);
    noStroke();
    triangle(mountains.tip_x_pos + 277,
             260,
             mountains.tip_x_pos + 338,
             260,
             mountains.tip_x_pos + 308,
             200);

}

// Function to draw trees objects.

function drawTrees(tree) {

    strokeWeight(2);
    treePos_x = 850;
    treePos_y = floorPos_y;

    fill(139, 69, 19);
    stroke(0, 0, 0);
    rect(tree + 750, -200 / 2 + floorPos_y, 25, 200 / 2);
    fill(34, 139, 34);
    ellipse(tree + 763, -200 / 2 + floorPos_y, 65, 80);

    fill(139, 69, 19);
    stroke(0, 0, 0);
    rect(tree + 650, -200 / 2 + floorPos_y, 25, 200 / 2);
    fill(34, 139, 34);
    ellipse(tree + 663, -200 / 2 + floorPos_y, 65, 200 / 2);

}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {

    fill(128, 0, 0);
    rect(t_canyon.x_pos - 32,
         432,
         100,
         t_canyon.width);


    fill(0, 0, 0);
    triangle(t_canyon.spikes_x_pos + 80,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 100,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 90,
             t_canyon.spikes_y_pos + 519);
    fill(0, 0, 0);
    triangle(t_canyon.spikes_x_pos + 100,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 120,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 110,
             t_canyon.spikes_y_pos + 519);
    fill(0, 0, 0);
    triangle(t_canyon.spikes_x_pos + 120,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 140,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 130,
             t_canyon.spikes_y_pos + 519);
    fill(0, 0, 0);
    triangle(t_canyon.spikes_x_pos + 140,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 160,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 150,
             t_canyon.spikes_y_pos + 519);
    fill(0, 0, 0);
    triangle(t_canyon.spikes_x_pos + 160,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 180,
             t_canyon.spikes_y_pos + 550,
             t_canyon.spikes_x_pos + 170, 
             t_canyon.spikes_y_pos + 519);

    checkCanyon(t_canyon);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {

    if ((gameChar_world_x < t_canyon.x_pos - 70 + t_canyon.width && gameChar_world_x > t_canyon.x_pos - 70) && (gameChar_y >= floorPos_y)) {

        isPlummeting = true;

    }

    if (isPlummeting == true) {
        gameChar_y += 5;
    }

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {


    if (t_collectable.isFound == false) {
        strokeWeight(4);
        fill(255, 215, 0);
        ellipse(t_collectable.x_pos,
                t_collectable.y_pos,
                30, 
                30);

        checkCollectable(t_collectable);
    }
}




// Function to check character has collected an item.

function checkCollectable(t_collectable) {


    distCollectable = dist(gameChar_world_x,
                           gameChar_y, 
                           t_collectable.x_pos, 
                           t_collectable.y_pos);

    if (distCollectable <= 45) {
        t_collectable.isFound = true;

        game_score += t_collectable.size;
    }

}

function renderFlagpole() {

    push();
    stroke(0);
    strokeWeight(6);
    line(flagpole.x_pos, 
         floorPos_y,
         flagpole.x_pos,
         floorPos_y - 200)

    if (flagpole.isReached) {
        noStroke();
        fill(255, 0, 0);
        rect(flagpole.x_pos,
             floorPos_y - 200,
             50,
             50);

        noStroke();
        fill(255, 255, 0);
        rect(flagpole.x_pos + 24,
             floorPos_y - 200, 
             23,
             50);

        noStroke();
        fill(0, 0, 255);
        rect(flagpole.x_pos + 47,
             floorPos_y - 200,
             23, 
             50);

    } else

    {

        noStroke();
        fill(255, 0, 0);
        rect(flagpole.x_pos, 
             floorPos_y - 50, 
             70,
             50);

        noStroke();
        fill(255, 255, 0);
        rect(flagpole.x_pos + 24, 
             floorPos_y - 50, 
             23, 
             50);

        noStroke();
        fill(0, 0, 255);
        rect(flagpole.x_pos + 47, 
             floorPos_y - 50, 
             23, 
             50);


    }
    pop();
}

function checkFlagpole() {
    // console.log("check flagpole");

    var d = abs(gameChar_world_x - flagpole.x_pos);

    if (d < 50) {

        flagpole.isReached = true;
    }

}

function startGame() {

    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;

    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;



    // Initialise arrays of scenery objects.

    //draw trees
    trees_x = [100, 250, 500, 750, 1000, 1250];

    //draw mountains

    mountain = [{
        x_pos: 185
    }, {
        x_pos: 1002
    }, {
        x_pos: 1500
    }, {
        tip_x_pos: 2
    }, {
        tip_x_pos: 819
    }, {
        tip_x_pos: 1317
    }];


    //    draw clouds
    cloud = [{
            x_pos: 123,
            y_pos: 120
        },
        {
            x_pos: 503,
            y_pos: 30
        },
        {
            x_pos: 1003,
            y_pos: 150
        },
        {
            x_pos: 1503,
            y_pos: 98
        }
    ];

    canyon = [{
            x_pos: 112,
            width: 145,
            spikes_x_pos: 0,
            spikes_y_pos: 25
        },
        {
            x_pos: 1000,
            width: 145,
            spikes_x_pos: 888,
            spikes_y_pos: 25
        },
        {
            x_pos: 2000,
            width: 145,
            spikes_x_pos: 1888,
            spikes_y_pos: 25
        }
    ];


    //    
    collectable = [{
            x_pos: 1800,
            y_pos: 350,
            size: 50,
            isFound: false
        },
        {
            x_pos: 150,
            y_pos: 365,
            size: 50,
            isFound: false
        },
        {
            x_pos: 1450,
            y_pos: 390,
            size: 50,
            isFound: false
        },
        {
            x_pos: 712,
            y_pos: 300,
            size: 50,
            isFound: false
        },

        {
            x_pos: 1350,
            y_pos: 200,
            size: 50,
            isFound: false
        }
    ];

    game_score = 0;

    flagpole = {

        x_pos: 2300,
        isReached: false
    }

    lives -= 1;

    platforms = [];

    enemies = [];
    enemies.push(new Enemy(200, floorPos_y, 50));
    enemies.push(new Enemy(700, floorPos_y, 15));
    enemies.push(new Enemy(1800, floorPos_y, 5));


    platforms.push(createPlatform(-40, floorPos_y - 70, 100));
    platforms.push(createPlatform(600, floorPos_y - 70, 100));
    platforms.push(createPlatform(850, floorPos_y - 80, 100));
    platforms.push(createPlatform(1050, floorPos_y - 90, 100));
    platforms.push(createPlatform(1200, floorPos_y - 150, 100));
    platforms.push(createPlatform(1850, floorPos_y - 70, 100));
}

function createPlatform(x, y, length)

{


    var p = {
        x: x,
        y: y,
        length: length,
        draw: function() 
        
        {
            fill(255, 0, 0);
            strokeWeight(2);
            stroke(255, 255, 0);
            rect(this.x, this.y, this.length, 20);

        },

        checkContact: function(gc_x, gc_y) 
        
        {
            //checks collision between the character and the platform

            if (gc_x > this.x && gc_x < this.x + this.length)


            {
                var d = this.y - gc_y;

                if (d >= 0 && d < 5)

                {

                    return true;

                }

            }

            return false;
        }


    }

    return p;
}

function Enemy(x, y, range) {

    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.incr = 1;

    this.draw = function() 
    
    {
        noStroke();
        fill(0);
        ellipse(this.current_x, this.y - 30, 60);
        fill(255, 0, 0);
        ellipse(this.current_x - 8, this.y - 35, 10);
        ellipse(this.current_x + 8, this.y - 35, 10);
        stroke(255, 0, 0);
        line(
            this.current_x - 12,
            this.y - 55,
            this.current_x - 6,
            this.y - 45
        );
        line(
            this.current_x + 12,
            this.y - 55,
            this.current_x + 6,
            this.y - 45
        );
        fill(255, 0, 0);
        rect(this.current_x - 10, this.y - 35 + 14, 20, 1);

    }

    this.update = function() 
    
    {

        this.current_x += this.incr;

        if (this.current_x < this.x) 
        
        {

            this.incr = 1;
        } 
        
        else if (this.current_x > this.x + this.range) 
        
        {
            this.incr = -1;
        }

    }

    this.isContact = function(gc_x, gc_y) 
    
    {

        //returns true if collision occurs
        var d = dist(gc_x, gc_y, this.current_x, this.y);

        if (d < 30)

        {

        return true;

        }

        return false;

    }

}