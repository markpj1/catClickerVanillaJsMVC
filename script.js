var model = {
    currentCat: null,
    adminShow: false, //hides display area	
    cats: [{
        name: 'catOne',
        imgSrc: 'img/catOne.jpg',
        clickCount: 0
    }, {
        name: 'catTwo',
        imgSrc: 'img/catTwo.jpeg',
        clickCount: 0
    }, {
        name: 'catThree',
        imgSrc: 'img/catThree.jpeg',
        clickCount: 0
    }, {
        name: 'catFour',
        imgSrc: 'img/catFour.jpeg',
        clickCount: 0
    }, {
        name: 'catFive',
        imgSrc: 'img/catFive.jpeg',
        clickCount: 0
    }]
};

var controller = {

    init: function() {
        //set currentCat to have a property.
        model.currentCat = model.cats[0];
        console.log('model log: ', model);

        catView.init();
        catListView.init();
        adminView.init();
        adminView.hide();
    },
    //gets current property of models.currentCat.
    getCurrentCat: function() {
        return model.currentCat;
    },
    //gets all hard coded properties of model.cats
    getCats: function() {
        return model.cats;
    },
    //Updates properties of model.currentCat
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    // increments model.clickCount. 
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
    //Logic to hide and display adminView
    adminDisplay: function() {
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show();
        } else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide();
        }
    },
    //cancels admin view
    adminCancel: function() {
        adminView.hide()
    },
    //Updates model.current to new value adminView.
    adminSave: function() {
        model.currentCat.name = adminCatName.value;
        model.currentCat.imgSrc = adminCatImg.value;
        model.currentCat.clickCount = adminClickCount.value;
        catListView.render();
        catView.render();
        adminView.hide();
    }
}; //controller end

var catView = {

    init: function() {
        //render this view (update the DOM elements with the right values) 
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('catName');
        this.catCountElem = document.getElementById('catCount');
        this.catImageElem = document.getElementById('catImage');

        this.catImageElem.addEventListener('click', function() {
            controller.incrementCounter();
        });
        this.render();

    },
    render: function() {
        //update the DOM with properties from the current cat.
        var currentCat = controller.getCurrentCat();

        console.log('currentCat', currentCat)
        this.catNameElem.textContent = currentCat.name;
        this.catCountElem.textContent = currentCat.clickCount;
        this.catImageElem.src = currentCat.imgSrc;


    }




}; //end catDetailView.

var catListView = {

    init: function() {

        this.catListElem = document.getElementById('catList');

        this.render();

    },
    render: function() {
        var cat, elem, i;

        var cats = controller.getCats();

        this.catListElem.innerHTML = '';

        for (var i = 0; i < cats.length; i++) {
            cat = cats[i];

            elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);

        };
    }



}; //End catListView

var adminView = {

    init: function() {
        var admin = document.getElementById('admin');
        this.adminCatName = document.getElementById('adminCatName');
        this.adminCatImg = document.getElementById('adminCatImg');
        this.adminClickCount = document.getElementById('adminClickCount');
        this.adminButton = document.getElementById('adminButton');
        this.adminSave = document.getElementById('adminSave');
        this.adminCancel = document.getElementById('adminCancel');

        this.adminButton.addEventListener('click', function() {
            controller.adminDisplay();
        });

        this.adminSave.addEventListener('click', function() {
            controller.adminSave();
        });

        this.adminCancel.addEventListener('click', function() {
            controller.adminCancel();
        });

        this.render();
    },

    render: function() {
        var currentCat = controller.getCurrentCat();

        this.adminCatName.value = currentCat.name;
        this.adminClickCount.value = currentCat.clickCount;
        this.adminCatImg.value = currentCat.imgSrc;
    },

    show: function() {
        admin.style.display = 'block';
    },

    hide: function() {
        admin.style.display = 'none';
    }

};



//Invoke the Method :)
$(controller.init());

