
var model = {
  currentCat: null,	
  cats: [
	{
	  name: 'catOne',
	  imgSrc: 'img/catOne.jpg',
	  clickCount: 0
	},
	{
	  name: 'catTwo',
	  imgSrc: 'img/catTwo.jpeg',
	  clickCount: 0
	},
	{
	  name: 'catThree',
	  imgSrc: 'img/catThree.jpeg',
	  clickCount: 0
	},
	{
	  name: 'catFour',
	  imgSrc: 'img/catFour.jpeg',
	  clickCount: 0
	},
	{
	  name: 'catFive',
	  imgSrc:  'img/catFive.jpeg',
	  clickCount: 0
	}
  ]
};

var controller = {
	//set currentCat to have a property.
	init: function () {
	  model.currentCat = model.cats[0]	
	  console.log('sets current cat to first property in Obj',model.currentCat);
	  catView.init();
	  catListView.init();
	},
    //gets current property of models.currentCat.  
	getCurrentCat: function () {
		return model.currentCat;
	},
    //gets all hard coded properties of model.cats 
	getCats: function () {
		return model.cats;
	},
    
    //Updates properties of 
	setCurrentCat: function (cat) {
		model.currentCat = cat;
	},
    // adds one to model.clickCount. 
	incrementCounter: function () {
		model.currentCat.clickCount += 1;
		catView.render();
	}	
};//controller end

var catView = {
	init: function () {
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catCountElem = document.getElementById('cat-count');
		this.catImageElem = document.getElementById('cat-image');
        
        this.catImageElem.addEventListener('click', function () {
        	controller.incrementCounter();        	
        });

        //render this view (update the DOM elements with the right values) 
        this.render();
	},

	render: function () {
		//update the DOM with properties from the current cat.
		var currentCat = controller.getCurrentCat();
		
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
		this.catCountElem.textContent = currentCat.clickCount;   
	}


	 

	
};//end catDetailView.

var catListView = {
	
	init: function () {

		//Store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        this.render(); 

	},

	render: function () {
		var cat, elem, i;

		var cats = controller.getCats();
		
		this.catListElem.innerHTML = '';

		for (var i = 0; i < cats.length; i++) {
		 	cat = cats[i];
		 
			
		     console.log('cats', cat.name);
			
			elem = document.createElement('li');
			elem.textContent = cat.name;
			
			
			elem.addEventListener('click', (function (catCopy) {
				return function () {
					controller.setCurrentCat(catCopy);
					catView.render();
				}
 			})(cat));

			
			this.catListElem.appendChild(elem);
		
		}



	}

  
};//End catListView



	

controller.init();
//controller.init();
//Document.ready