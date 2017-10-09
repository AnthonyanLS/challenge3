var URL = "http://ls2.azurewebsites.net/api/getUsers";

function takeName(){
    var name = document.getElementById("name").value.toLowerCase();
    var sumTotal = 0;

    //Name is assigned to the inputted string and it is converted to all lowercase

    for(var i = 0; i < name.length; i++)
    {
        //This runs a for loop to go through all the letters in "name"
        var letter = name[i].charCodeAt(0);
        console.log(letter);

        //The unicode of this character is assigned to a variable called "letter"

        if((letter < 97 || letter > 122) && letter != 32){
            letter = 0;
            continue;

            //This checks if letter is within the lowercase alphabet or if it's a space
        }
        else{
            letter = (letter - 96) % 9;
            
            //Taking away 96 gives you the letter assignment in the alphabet. Using % you get the number used in numerology
            //e.g. the unicode for "a" is 97, so when you take away 97 you get 1. 1 % 9 = 1
            //e.g. j is the 10th letter. 10 % 9 = 1

            if(letter == 0){
                sumTotal +=9;

                //9 % 9 returns 0 so we need to use an if statement for letters i & r
            }
            else{
                sumTotal +=letter;
            }
        }
    }

    console.log(sumTotal);

    var realTotal = 0;
    var stringLength = sumTotal.toString().length;

    //realTotal is the total after accounting for multiple digits

    if(sumTotal == 11 || sumTotal == 22){
        realTotal = sumTotal;

        //If the current total is 11 or 22 that's fine because those are also numbers under numerology
    }
    else{
        for(var j = 0; j < stringLength; j++){
            var x = sumTotal % 10;
            console.log(x);
            realTotal += x;
            sumTotal = (sumTotal - x)/10;
            console.log(sumTotal);

            //This loop repeats for the length of the number. So for 34 the loop would occur twice. 
            //We use % 10 against the sumTotal from above. So 34 % 10 would give you 4.
            //This remainder is added to realTotal. So 4 would be added to realTotal, therefore realTotal = 4
            //sumTotal is recalculated by taking away the remainder and then it's divided by 10.
            //sumTotal was originally 34. sumTotal is now (34 - 4)/10, which is 3
            //the above process is repeated for a second and last time as 34 has two digits
            //3 % 10 = 3. Add this onto the current real total and you get 7.
        }
    }

    var results = "";

    switch (realTotal){
        case 1:
            results = "Initiator action, pioneering, leading, independent, attaining, individualistic";
            break;
        case 2:
            results = "Cooperation, adaptability, consideration of others, partnering, mediating";
            break;  
        case 3:
            results = "Expression, verbalization, socialization, the arts, the joy of living";
            break;
        case 4:
            results = "Values foundation, order, service, struggle against limits, steady growth";
            break;    
        case 5:
            results = "Expansiveness, visionary, adventure, the constructive use of freedom";
            break;
        case 6:
            results = "Responsibility, protection, nurturing, community, balance, sympathy";
            break;
        case 7:
            results = "Analysis, understanding, knowledge, awareness, studious, meditating";
            break;
        case 8:
            results = "Practical endeavors, status oriented, power-seeking, high-material goals";
            break;  
        case 9:
            results = "Humanitarian, giving nature, selflessness, obligations, creative expression";
            break;
        case 11:
            results = "Higher spiritual plane, intuitive, illumination, idealist, a dreamer";
            break;  
        case 22:
            results = "The Master Builder, large endeavors, powerful force, leadership";
            break;
        default:
            results = "Something has gone wrong. Please try again.";          
    }
 
    
    document.getElementById("result").innerHTML = "Your numerology number is " + realTotal + "!" + "<br/>" + "<br/>"+ "Your personality shows you have strength in the following areas: " + results;
}

function postRecord() {
    var name = document.getElementById("name").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", URL + "?username=" + name, true);
    xhttp.send();
}

function getRecord() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var i = 0; i < response.length; i++) {
              document.getElementById("result").innerHTML += response[i].name + "<br> ";
            }
        }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
}