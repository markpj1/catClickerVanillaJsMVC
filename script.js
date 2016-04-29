
var model = {
  currentCat: null,
  adminShow: false, //hides display area	
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
	  imgSrc:'img/catFive.jpeg',
	  clickCount: 0
	}
  ]
};

var controller = {
	//set currentCat to have a property.
	init: function () {
	  model.currentCat = model.cats[0]	
	  console.log('sets current cat to first property in Obj',model.currentCat);
	  
	  catListView.init();
	  catView.init();
	  adminView.init();
	  adminView.hide();
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
	},

	adminDisplay: function () {
		if(model.adminShow === false) {
			model.adminShow = true;
			adminView.show();
		}
		else if (model.adminShow === true) {
			model.adminShow = false;
			adminView.hide();
		}
	},

	adminCancel: function () {
		adminView.hide()
	},

	adminSave: function () {
		model.currentCat.name = adminCatName.value;
		model.currentCat.imgSrc = adminCatImg.value;
		model.currentCat.clickCount = adminClickCount.value;
		catView.render();
		catListView.render();
		adminView.hide();
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
					//controller.incrementCounter();
				};
 			})(cat));

			
			this.catListElem.appendChild(elem);
		
		}



	}

  
};//End catListView

var adminView = {

	init: function () {
		this.adminCatName = document.getElementById('adminCatName');
		this.adminCatImg = document.getElementById('adminCatImg');
		this.adminClickCount = document.getElementById('adminClickCount');
		var admin = document.getElementById('admin');
		this.adminBtn = document.getElementById('admin-button');
        this.adminCancel = document.getElementById('admin-cancel'); 
		this.adminSave = document.getElementById('admin-save');
		
		this.adminBtn.addEventListener('click', function () {
			controller.adminDisplay();
		});

		this.adminCancel.addEventListener('click', function () {
			controller.adminCancel();
		});

		this.adminSave.addEventListener('click', function () {
			controller.adminSave();
		});

		this.render();
	},

	render: function () {
		var currentCat = controller.getCurrentCat();
        console.log('current', currentCat);
		 //calls current cat
		this.adminCatName.value = currentCat.name;
		this.adminCatImg.value = currentCat.imgSrc;
		this.adminClickCount.value = currentCat.clickCount;		

	},
	
	show: function () {
		admin.style.display = 'block';
	},
	
	hide: function () {
		admin.style.display = 'none';
	}
};



	

$(controller.init());
//controller.init();
//Document.ready