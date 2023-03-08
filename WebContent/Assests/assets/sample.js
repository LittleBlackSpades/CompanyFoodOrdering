"use strict";



define('sample/app', ['exports', 'sample/resolver', 'ember-load-initializers', 'sample/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('sample/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('sample/controllers/adminhome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    categories: [Ember.Object.create({
      foodcategory_name: ""
    })],
    foodItem: [Ember.Object.create({
      fooditem_name: "",
      foodcategory_name: "",
      item_desc: "",
      unit_price: "",
      avail_quantity: "",
      max_allowed_quanity: "",
      fooditem_pic: ""
    })],
    customer: [],
    order: [Ember.Object.create({
      fooditem_name: "",
      foodcategory_name: "",
      order_id: "",
      amount: "",
      customer_id: "",
      created_time: "",
      item_quantity: ""
    })],
    isOrder: false,
    isFood: false,
    isFoodItem: false,
    isCustomer: false,
    isaddItem: false,
    isEditItem: false,
    id: '',
    itemUpdate: [],
    showOrder: [],
    onInit: function () {
      this.send('showCustomer');
    }.on('init'),

    actions: {
      showCategory: function showCategory() {
        debugger;
        this.set("isCategory", true);
        this.set("isFoodItem", false);
        this.set("isCustomer", false);
        this.set("isOrder", false);
        var _this = this;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodCategories",
          type: "GET",
          async: false,

          success: function success(response) {
            _this.categories.setObjects(response);
          },
          error: function error(response) {
            alert("Error Occured .Pls register after sometime " + response);
          }
        });
      },

      showFoodItem: function showFoodItem() {
        this.foodItem.setObjects([]);
        this.set("isCategory", false);
        this.set("isFoodItem", true);
        this.set("isCustomer", false);
        this.set("isOrder", false);
        var _this = this;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodItems",
          type: "GET",
          async: false,

          success: function success(response) {
            _this.foodItem.setObjects(response);
            return response;
          },
          error: function error(response) {
            alert("Error Occured .Pls register after sometime " + response);
          }
        });
      },
      showCustomer: function showCustomer() {
        this.set("isCategory", false);
        this.set("isFoodItem", false);
        this.set("isCustomer", true);
        this.set("isOrder", false);
        var _this = this;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/customers",
          type: "GET",
          async: false,

          success: function success(response) {
            _this.set('customer', response);
            return response;
          },
          error: function error(response) {
            alert("Error Occured .Pls register after sometime " + response);
          }
        });
        // debugger;
        var len = this.get('customer').length;
        for (var i = 0; i < len; i++) {
          if (this.customer[i].role == 1) {
            this.customer.splice(i, i);
          }
        }
      },
      showOrder: function showOrder() {
        this.showOrder.setObjects([]);
        this.set("isCategory", false);
        this.set("isFoodItem", false);
        this.set("isCustomer", false);
        this.set("isOrder", true);
        var _this = this;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/orderitem/timelogs",
          type: "GET",
          async: false,

          success: function success(response) {
            _this.set('order', response);
            return response;
          },
          error: function error(response) {
            alert("Error Occured .Pls register after sometime " + response);
          }
        });
        this.showOrder.pushObjects(this.get("order"));
        //console.log(this.showOrder);
      },
      filterOrder: function filterOrder() {
        this.showOrder.setObjects([]);
        //debugger;
        var sdate = this.get("startDate");
        var ldate = this.get("lastDate");
        var len = this.order.length;
        for (var i = 0; i < len; i++) {
          var date = this.get("order")[i].created_time.split(" ");
          if (sdate <= date[0] && ldate >= date[0]) {
            this.showOrder.pushObject(this.order[i]);
          }
        }
      },
      openAddItem: function openAddItem() {
        this.set("isaddItem", true);
      },
      cancelAdd: function cancelAdd() {
        this.set("isaddItem", false);
      },
      addfood: function addfood() {
        var fooditem_name = this.get("fooditem_name");
        var foodcategory_name = this.get("foodcategory_name");
        var item_desc = this.get("item_desc");
        var unit_price = this.get("unit_price");
        var avail_quantity = this.get("avail_quantity");
        var max_allowed_quanity = this.get("max_allowed_quanity");
        var fooditem_pic = this.get("fooditem_pic");
        var t = this;
        var item = {
          "fooditem_name": fooditem_name,
          "foodcategory_name": foodcategory_name,
          "item_desc": item_desc,
          "unit_price": unit_price,
          "avail_quantity": avail_quantity,
          "max_allowed_quanity": max_allowed_quanity,
          "fooditem_pic": fooditem_pic
        };

        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodItem/add",
          type: "POST",
          data: JSON.stringify(item),
          success: function success(response) {
            alert("Hurray!!! you have added the food item successfully");
            t.set("isaddItem", false);
            t.foodItem.pushObject(item);
          },
          error: function error(response) {
            alert("Error Occured .Pls add Food item after sometime" + response);
            t.set("isaddItem", false);
          }

        });
      },
      deleteCategories: function deleteCategories(index, foodcategory_name) {
        var category = foodcategory_name;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodCategories/" + category,
          type: "DELETE",
          success: function success(response) {
            alert("Hurray!!! you have deleted " + category + " successfully");
          },
          error: function error(response) {
            alert("Error Occured .Pls try after sometime" + response);
          }

        });
        this.categories.removeObject(index);
      },
      deleteItem: function deleteItem(item) {
        var id = item.fooditem_id;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodItem/" + id,
          type: "DELETE",
          success: function success(response) {
            alert("Hurray!!! you have deleted " + item.fooditem_name + " successfully");
          },
          error: function error(response) {
            alert("Error Occured .Pls try after sometime" + response);
          }

        });
        this.get("foodItem").removeObject(item);
      },
      editOpen: function editOpen(id, item) {
        this.set("isEditItem", true);
        this.set("id", id);
        this.set("itemUpdate", item);
        this.setProperties({
          fooditem_name: item.fooditem_name,
          item_desc: item.item_desc,
          max_allowed_quanity: item.max_allowed_quanity,
          unit_price: item.unit_price,
          avail_quantity: item.avail_quantity,
          foodcategory_name: item.foodcategory_name
        });
      },
      canceledit: function canceledit() {
        this.set("isEditItem", false);
      },
      editfood: function editfood() {
        var fooditem_name = this.get("fooditem_name");
        var foodcategory_name = this.get("fooditem_name");
        var item_desc = this.get("item_desc");
        var unit_price = this.get("unit_price");
        var avail_quantity = this.get("avail_quantity");
        var max_allowed_quanity = this.get("max_allowed_quanity");
        var fooditem_pic = this.get("fooditem_pic");
        var foodItem_id = this.get('id');
        var t = this;
        var item = {
          "foodItem_id": foodItem_id,
          "fooditem_name": fooditem_name,
          "foodcategory_name": foodcategory_name,
          "item_desc": item_desc,
          "unit_price": unit_price,
          "avail_quantity": avail_quantity,
          "max_allowed_quanity": max_allowed_quanity,
          "fooditem_pic": fooditem_pic
        };

        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodItems/" + foodItem_id + "/update",
          type: "PUT",
          data: JSON.stringify(item),
          success: function success(response) {
            alert("Hurray!!! you have updated the food item successfully");
            t.set("isEditItem", false);
          },
          error: function error(response) {
            alert("Error Occured .Pls update Food item after sometime" + response);
            t.set("isEditItem", false);
          }

        });
        this.get("foodItem").removeObject(this.get("itemUpdate"));
        this.get("foodItem").pushObject(item);
      },
      logout: function logout() {
        sessionStorage.clear();
        this.transitionToRoute("login");
      }

    }

  });
});
define('sample/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    // queryParams:['id'],
    // id:null,
    actions: {
      handleSignUp: function handleSignUp() {

        var email_id = this.get('email_id');
        var passwrd = this.get('passwrd');

        var user = {
          "email_id": email_id,
          "passwrd": passwrd

        };
        var data = this;
        var response = Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/customers/login",
          type: "POST",
          dataType: 'json',
          data: JSON.stringify(user),
          success: function success(resulttext) {
            if (resulttext[0].role == 1) {
              var adminName = resulttext[0].firstname;
              sessionStorage.setItem("admin_name", adminName);
              sessionStorage.setItem("role", resulttext[0].role);
              data.transitionToRoute("adminhome", adminName);
            } else {
              var userid = resulttext[0].customer_id;
              sessionStorage.setItem("customer_id", userid);
              sessionStorage.setItem("role", resulttext[0].role);
              data.transitionToRoute("userhome", userid);
            }
            return resulttext;
          },
          error: function error(resulttext) {
            alert("Error Occured " + resulttext);
            return resulttext;
          }

        });
      }
    }

  });
});
define('sample/controllers/registration', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      handleRegisterUp: function handleRegisterUp() {

        var firstName = this.get('firstName');
        var lastName = this.get('lastName');
        var email_id = this.get('email_id');
        var passwrd = this.get('passwrd');
        var phoneno = this.get('phoneno');
        var designation = this.get('designation');
        var t = this;
        var user = {
          "firstName": firstName,
          "lastName": lastName,
          "email_id": email_id,
          "passwrd": passwrd,
          "phoneno": phoneno,
          "designation": designation

        };

        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/customers/register",
          type: "POST",
          data: JSON.stringify(user),
          success: function success(response) {
            alert("Hurray!!! you are register successfully");
            t.transitionToRoute("login");
          },
          error: function error(response) {
            alert("Error Occured .Pls register after sometime");
          }

        });
      }

    }

  });
});
define('sample/controllers/userhome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    //queryParams:['id'],
    max_allowed_quanity: '',
    fooditem_id: '',
    item_desc: '',
    fooditem_pic: '',
    fooditem_name: '',
    unit_price: '',
    foodcategory_name: '',
    avail_quantity: '',
    foods: [],
    foodStore: [Ember.Object.create({
      fooditem_name: "",
      foodcategory_name: "",
      item_desc: "",
      unit_price: "",
      avail_quantity: "",
      max_allowed_quanity: "",
      fooditem_pic: ""
    })],
    isCart: false,
    cartItem: [],
    cartAdd: [],
    onclick: false,
    items: [],
    color: 'color-head',
    sum: 0,
    cart_len: 0,
    // id:this.get("id"),

    onInit: function () {
      this.set('color', 'color-head');
      this.send('getAllItems');
      //debugger;
    }.on('init'),

    // observingFoods : Em.observer('cartItem.@each', function(){
    //   debugger;
    //     this.set('cartItem',this.get('cartItem')); //NO I18N
    // }),

    unSelectColors: function unSelectColors() {
      this.setProperties({
        isAllSelected: false,
        isBFSelected: false,
        isDinnerSelected: false,
        isLunchSelected: false,
        isOtherSelected: false
      });
    },

    actions: {
      getAllItems: function getAllItems() {
        this.foodStore.setObjects([]);
        this.unSelectColors();
        this.set('isAllSelected', true);
        var _this = this;
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/foodItems",
          type: "GET",
          async: false,

          success: function success(response) {
            _this.set('foods', response);
            return response;
          },
          error: function error(response) {
            alert("Error Occured .Pls rorder after sometime " + response);
          }

        });
        this.foodStore.pushObjects(this.get('foods'));
      },
      others: function others() {
        // debugger;
        this.foods.setObjects([]);
        this.unSelectColors();
        this.set('isOtherSelected', true);
        var len = this.foodStore.length;
        for (var i = 0; i < len; i++) {
          if (this.foodStore.objectAt(i).foodcategory_name != "Breakfast" && this.foodStore.objectAt(i).foodcategory_name != "Dinner" && this.foodStore.objectAt(i).foodcategory_name != "Lunch") {
            this.get('foods').pushObject(this.foodStore.objectAt(i));
          }
        }
      },
      breakfast: function breakfast() {
        this.foods.setObjects([]);
        this.unSelectColors();
        this.set('isBFSelected', true);
        var len = this.foodStore.length;
        for (var i = 0; i < len; i++) {
          if (this.foodStore.objectAt(i).foodcategory_name == "Breakfast") {
            this.get('foods').pushObject(this.foodStore.objectAt(i));
          }
        }
      },
      lunch: function lunch() {
        this.foods.setObjects([]);
        this.unSelectColors();
        this.set('isLunchSelected', true);
        var len = this.foodStore.length;
        for (var i = 0; i < len; i++) {
          if (this.foodStore.objectAt(i).foodcategory_name == "Lunch") {
            this.get('foods').pushObject(this.foodStore.objectAt(i));
          }
        }
      },
      dinner: function dinner() {
        this.foods.setObjects([]);
        this.unSelectColors();
        this.set('isDinnerSelected', true);
        var len = this.foodStore.length;
        for (var i = 0; i < len; i++) {
          if (this.foodStore.objectAt(i).foodcategory_name == "Dinner") {
            this.get('foods').pushObject(this.foodStore.objectAt(i));
          }
        }
      },
      addingToCart: function addingToCart(item) {
        //this.set("isCart",true);
        var temp = this.sum;
        var orderQuantity = parseInt(Ember.$('#' + item.fooditem_id).val());

        if (item.max_allowed_quanity < orderQuantity) {
          alert("You can only select " + item.max_allowed_quanity);
        } else if (this.items.includes(item.fooditem_id)) {
          alert("The Item is already in cart");
        } else if (item.avail_quantity <= orderQuantity) {
          alert("Food is not available at the moment");
        } else {

          this.cartItem.pushObject(Ember.Object.create({
            fooditem_name: item.fooditem_name,
            unit_price: item.unit_price,
            item_quantity: orderQuantity,
            fooditem_id: item.fooditem_id
          }));
          this.items.push(item.fooditem_id);
          var price = item.unit_price * orderQuantity;
          temp += price;
          this.set("sum", temp);
        }
        this.set("cart_len", this.get("items").length);
      },
      showCart: function showCart() {
        this.set("isCart", true);
      },
      deleteOrder: function deleteOrder(index, fid) {
        //debugger;
        var calc = this.sum - this.cartItem.objectAt(index).unit_price * this.cartItem.objectAt(index).item_quantity;
        this.set('sum', calc);
        this.get('cartItem').removeObject(this.cartItem.objectAt(index));
        var i = this.get("items").indexOf(fid);
        this.get("items").splice(i, 1);
        this.set("cart_len", this.get("items").length);
      },
      close: function close() {
        this.set("isCart", false);
      },
      order: function order(sum) {
        // debugger;
        var amount = sum;
        var len = this.cartItem.length;
        var orderList = [];
        for (var i = 0; i < len; i++) {
          var order = {
            "amount": amount,
            "fooditem_id": this.cartItem.objectAt(i).fooditem_id,
            "item_quantity": this.cartItem.objectAt(i).item_quantity,
            "customer_id": this.get("model.id")
          };
          orderList.push(order);
        }
        Ember.$.ajax({
          url: "http://localhost:8080/CompanyFoodOrderingWebApp/orders",
          type: "POST",
          dataType: 'json',
          data: JSON.stringify(orderList),
          success: function success(resulttext) {
            alert("Order is placed successfully !!!");
            //_this.get("isCart").set(false);
          },
          error: function error(resulttext) {
            alert("Error Occured" + resulttext);
          }

        });
        this.get("cartItem").setObjects([]);
        this.set("sum", 0);
        this.get("items").setObjects([]);
        this.set("cart_len", this.get("items").length);
      },
      logout: function logout() {
        sessionStorage.clear();
        this.transitionToRoute("login");
      }

    }

  });
});
define('sample/helpers/app-version', ['exports', 'sample/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('sample/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('sample/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('sample/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'sample/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('sample/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('sample/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('sample/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('sample/initializers/export-application-global', ['exports', 'sample/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('sample/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('sample/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('sample/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("sample/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('sample/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('sample/router', ['exports', 'sample/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('registration');
    this.route('login');
    this.route('adminhome', { path: '/adminhome/:name' }, function () {});
    //this.route('userhome');
    this.route('userhome', { path: '/userhome/:id' });
  });

  exports.default = Router;
});
define("sample/routes/adminhome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      if (sessionStorage.getItem("role") == 0) {
        this.transitionTo("userhome", sessionStorage.getItem("customer_id"));
      }
    },
    model: function model(name) {
      return name;
    },
    afterModel: function afterModel(model) {
      debugger;
      if (sessionStorage.length > 1 && model.name !== sessionStorage.getItem("admin_name")) {
        this.transitionTo("adminhome", sessionStorage.getItem("admin_name"));
      } else if (sessionStorage.length < 1) {
        this.transitionTo("login");
      }
    }
  });
});
define('sample/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      debugger;
      if (sessionStorage.getItem('customer_id') != null) {
        this.transitionTo('/userhome/' + sessionStorage.getItem('customer_id'));
      } else if (sessionStorage.getItem('admin_name') != null) {
        this.transitionTo('/adminhome/' + sessionStorage.getItem('admin_name'));
      }
    }
  });
});
define('sample/routes/registration', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("sample/routes/userhome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      if (sessionStorage.getItem("role") == 1) {
        this.transitionTo("adminhome", sessionStorage.getItem("admin_name"));
      }
    },
    model: function model(id) {
      debugger;
      return id;
    },
    afterModel: function afterModel(model) {
      debugger;
      if (sessionStorage.length > 0 && model.id !== sessionStorage.getItem("customer_id")) {
        this.transitionTo("userhome", sessionStorage.getItem("customer_id"));
      } else if (sessionStorage.length < 1) {
        this.transitionTo("login");
      }
    }
  });
});
define('sample/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("sample/templates/adminhome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vjxRyS6B", "block": "{\"statements\":[[0,\" \"],[11,\"div\",[]],[15,\"class\",\"btn-arrange\"],[13],[0,\"\\n\\n  \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"showCustomer\"]],[13],[0,\"Customer\"],[14],[0,\"\\n \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"showCategory\"]],[13],[0,\" Food Category \"],[14],[0,\"\\n \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"showFoodItem\"]],[13],[0,\" Food Item\"],[14],[0,\"\\n \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"showOrder\"]],[13],[0,\"Time Log\"],[14],[0,\"\\n   \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"logout\"]],[13],[0,\"logout\"],[14],[0,\"\\n \"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"adm-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"adm-mid-layer\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"adm-table\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isCategory\"]]],null,{\"statements\":[[0,\"        \"],[11,\"table\",[]],[13],[0,\"\\n          \"],[11,\"thead\",[]],[13],[0,\"\\n              \"],[11,\"tr\",[]],[13],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"S.NO\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Food Category Name\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n         \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"categories\"]]],null,{\"statements\":[[0,\"            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"index\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"foodcategory_name\"]],false],[14],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"../assets/images/trash.png\"],[15,\"height\",\"20px\"],[15,\"width\",\"20px\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"deleteCategories\",[28,[\"item\"]],[28,[\"item\",\"foodcategory_name\"]]],null],null],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"item\",\"index\"]},null],[0,\"         \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isFoodItem\"]]],null,{\"statements\":[[0,\"       \"],[11,\"div\",[]],[15,\"class\",\"btn-class\"],[13],[11,\"button\",[]],[15,\"class\",\"fod-add-btn\"],[5,[\"action\"],[[28,[null]],\"openAddItem\"]],[13],[0,\" + Add\"],[14],[14],[0,\"\\n          \"],[11,\"table\",[]],[13],[0,\"\\n          \"],[11,\"thead\",[]],[13],[0,\"\\n              \"],[11,\"tr\",[]],[13],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Food Name\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Food Category Type\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Item Description\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Unit Price\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Available Quantity\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Item Pic\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Maximum Allowed Quantity\"],[14],[0,\"\\n\\n\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n         \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"foodItem\"]]],null,{\"statements\":[[0,\"            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"fooditem_name\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"foodcategory_name\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"item_desc\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"unit_price\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"avail_quantity\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"fooditem_pic\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"max_allowed_quanity\"]],false],[0,\"\\n                \"],[11,\"img\",[]],[15,\"src\",\"../assets/images/edit.png\"],[15,\"height\",\"20px\"],[15,\"width\",\"20px\"],[15,\"style\",\"padding:0px 10px\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"editOpen\",[28,[\"item\",\"fooditem_id\"]],[28,[\"item\"]]],null],null],[13],[14],[0,\"\\n               \"],[11,\"img\",[]],[15,\"src\",\"../assets/images/trash.png\"],[15,\"height\",\"20px\"],[15,\"width\",\"20px\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"deleteItem\",[28,[\"item\"]]],null],null],[13],[14],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"item\",\"index\"]},null],[0,\"            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isCustomer\"]]],null,{\"statements\":[[0,\"          \"],[11,\"table\",[]],[13],[0,\"\\n          \"],[11,\"thead\",[]],[13],[0,\"\\n              \"],[11,\"tr\",[]],[13],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Customer ID\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"First Name\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Last Name\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Email_Id\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Age\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Phone N0\"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n         \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"customer\"]]],null,{\"statements\":[[0,\"            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"customer_id\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"firstname\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"lastname\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"email_id\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"age\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"phoneno\"]],false],[0,\" \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"item\",\"index\"]},null],[0,\"         \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"isOrder\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"date\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"Start Date:\"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"date\",[28,[\"startDate\"]]]]],false],[0,\" \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"End Date :\"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"date\",[28,[\"lastDate\"]]]]],false],[0,\" \"],[14],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"submit\"],[15,\"value\",\" Filter Order\"],[15,\"id\",\"filter\"],[5,[\"action\"],[[28,[null]],\"filterOrder\"]],[13],[14],[0,\"\\n             \"],[14],[0,\"\\n          \"],[11,\"table\",[]],[13],[0,\"\\n          \"],[11,\"thead\",[]],[13],[0,\"\\n              \"],[11,\"tr\",[]],[13],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Order ID\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Food Item Name\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Food Category\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Order Quantity\"],[14],[0,\"\\n                \"],[11,\"th\",[]],[13],[0,\"Created Item\"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n         \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"showOrder\"]]],null,{\"statements\":[[0,\"            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"orderlist\",\"order_id\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"orderlist\",\"fooditem_name\"]],false],[0,\" \"],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"orderlist\",\"foodcategory_name\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"orderlist\",\"item_quantity\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"orderlist\",\"created_time\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"orderlist\",\"index\"]},null],[0,\"         \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isaddItem\"]]],null,{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"form\"],[5,[\"action\"],[[28,[null]],\"addfood\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n    \"],[11,\"form\",[]],[15,\"class\",\"login-form\"],[13],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"fooditem_name\",[28,[\"fooditem_name\"]],\"Fooditem Name\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"foodcategory_name\",[28,[\"foodcategory_name\"]],\"Foodcategory Name\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"item_desc\",[28,[\"item_desc\"]],\"Item description\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"unit_price\",[28,[\"unit_price\"]],\"Unit Price\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"avail_quantity\",[28,[\"avail_quantity\"]],\"Avail Quantity\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"max_allowed_quanity\",[28,[\"max_allowed_quanity\"]],\"Max Allowed Quantity\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"fooditem_pic\",[28,[\"fooditem_pic\"]],\"Food Item Pic Link\",true]]],false],[0,\"\\n\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn\"],[13],[0,\"Add\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[15,\"style\",\"background-color:#f2f2f2;color:black;\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"cancelAdd\"],null],null],[13],[0,\"Cancel\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEditItem\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"bg-blur\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"form\"],[5,[\"action\"],[[28,[null]],\"editfood\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n    \"],[11,\"form\",[]],[15,\"class\",\"login-form\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\"Food Name:\"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"fooditem_name\",[28,[\"fooditem_name\"]],\"Fooditem Name\",true]]],false],[0,\"\\n       \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\"Category Name:\"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"foodcategory_name\",[28,[\"foodcategory_name\"]],\"Foodcategory Name\",true]]],false],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\" Item Description:\"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"item_desc\",[28,[\"item_desc\"]],\"Item description\",true]]],false],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\"Unit Price:\"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"unit_price\",[28,[\"unit_price\"]],\"Unit Price\",true]]],false],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\" Avail Quantity:\"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"avail_quantity\",[28,[\"avail_quantity\"]],\"Avail Quantity\",true]]],false],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\"Maximum Allowed Quantity:\"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"max_allowed_quanity\",[28,[\"max_allowed_quanity\"]],\"Max Allowed Quantity\",true]]],false],[0,\"\\n      \"],[11,\"label\",[]],[15,\"for\",\"\"],[13],[0,\"Food Item Pic: \"],[14],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"fooditem_pic\",[28,[\"fooditem_pic\"]],\"Food Item Pic Link\",true]]],false],[0,\"\\n\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn\"],[13],[0,\"Update\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[15,\"style\",\"background-color:#f2f2f2;color:black;\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"canceledit\"],null],null],[13],[0,\"Cancel\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "sample/templates/adminhome.hbs" } });
});
define("sample/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YCECvvMm", "block": "{\"statements\":[[11,\"body\",[]],[13],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"zod-contracts-body\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"zod-contract-header\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"_heading\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"_title\"],[13],[0,\"Next \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"next\"],[13],[0,\" Meal\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n \"],[11,\"div\",[]],[15,\"class\",\"bg-image\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "sample/templates/application.hbs" } });
});
define("sample/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rngcNIXT", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"picture\"],[13],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"form\"],[13],[0,\"\\n    \"],[11,\"form\",[]],[15,\"class\",\"login-form\"],[13],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email_id\",[28,[\"email_id\"]],\"EmailId\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"password\",\"passwrd\",[28,[\"passwrd\"]],\"Password\",true]]],false],[0,\"\\n\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"handleSignUp\"]],[13],[0,\"Login\"],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"message\"],[13],[0,\"Not registered?\"],[11,\"a\",[]],[15,\"href\",\"registration\"],[13],[0,\" Sign Up\"],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "sample/templates/login.hbs" } });
});
define("sample/templates/registration", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Y5QAr2i6", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"picture\"],[13],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"form\"],[5,[\"action\"],[[28,[null]],\"handleRegisterUp\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n    \"],[11,\"form\",[]],[15,\"class\",\"login-form\"],[13],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"firstName\",[28,[\"firstName\"]],\"Firstname\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"lastName\",[28,[\"lastName\"]],\"Lastname\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email_id\",[28,[\"email_id\"]],\"Email Id\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"password\",\"passwrd\",[28,[\"passwrd\"]],\"Password\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"phoneno\",[28,[\"phoneno\"]],\"phoneno\",true]]],false],[0,\"\\n      \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\",\"placeholder\",\"required\"],[\"text\",\"designation\",[28,[\"designation\"]],\"designation\",true]]],false],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn\"],[13],[0,\"Sign Up\"],[14],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"message\"],[13],[0,\"Already registered?\"],[11,\"a\",[]],[15,\"href\",\"login\"],[13],[0,\" Log in\"],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "sample/templates/registration.hbs" } });
});
define("sample/templates/userhome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gt/SL+qu", "block": "{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"user-container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"cart\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"cart-button\"],[15,\"style\",\"margin-right: -120px; margin-top:15px\"],[13],[0,\" \"],[11,\"img\",[]],[15,\"src\",\"../assets/images/logout.jpg\"],[15,\"height\",\"31px\"],[15,\"width\",\"31px\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"logout\"],null],null],[13],[14],[14],[0,\"\\n     \"],[11,\"button\",[]],[15,\"class\",\"cart-button\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"https://www.licious.in/img/default/cart_icon.svg\"],[5,[\"action\"],[[28,[null]],\"showCart\"]],[13],[14],[11,\"span\",[]],[15,\"class\",\"dot\"],[13],[1,[26,[\"cart_len\"]],false],[14],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\\n\\n  \"],[11,\"div\",[]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"category-bar\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isAllSelected\"]],\"color-head\"],null]]]],[5,[\"action\"],[[28,[null]],\"getAllItems\"]],[13],[0,\" All\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isBFSelected\"]],\"color-head\"],null]]]],[5,[\"action\"],[[28,[null]],\"breakfast\"]],[13],[0,\"BreakFast\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isLunchSelected\"]],\"color-head\"],null]]]],[5,[\"action\"],[[28,[null]],\"lunch\"]],[13],[0,\"Lunch\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isDinnerSelected\"]],\"color-head\"],null]]]],[5,[\"action\"],[[28,[null]],\"dinner\"]],[13],[0,\"Dinner\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"isOtherSelected\"]],\"color-head\"],null]]]],[5,[\"action\"],[[28,[null]],\"others\"]],[13],[0,\"Others\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"food-container\"],[13],[0,\"\\n\\n        \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"foods\"]]],null,{\"statements\":[[0,\"\\n          \"],[11,\"li\",[]],[13],[0,\"\\n            \"],[11,\"article\",[]],[13],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"\\n              \"],[11,\"img\",[]],[16,\"src\",[34,[\"../assets/images/\",[28,[\"item\",\"fooditem_pic\"]]]]],[15,\"class\",\"img-container\"],[13],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item-desc\"],[13],[0,\"\\n              \"],[11,\"h4\",[]],[13],[1,[28,[\"item\",\"fooditem_name\"]],false],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[1,[28,[\"item\",\"item_desc\"]],false],[0,\"  \"],[14],[14],[0,\"\\n            \"],[11,\"footer\",[]],[13],[0,\"\\n                \"],[11,\"h4\",[]],[13],[0,\"Rs: \"],[1,[28,[\"item\",\"unit_price\"]],false],[14],[0,\"\\n                \"],[1,[33,[\"input\"],null,[[\"id\",\"type\",\"value\",\"class\",\"max\",\"min\"],[[28,[\"item\",\"fooditem_id\"]],\"number\",1,\"fod-input\",[28,[\"item\",\"max_allowed_quanity\"]],1]]],false],[0,\"\\n              \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[5,[\"action\"],[[28,[null]],\"addingToCart\",[28,[\"item\"]],[28,[\"item_quantity\"]]]],[13],[0,\" Add to cart\"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"          \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isCart\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"cart-open\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"../assets/images/cancel.png\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"close\"],null],null],[15,\"id\",\"close-button\"],[13],[14],[0,\"\\n      \"],[11,\"h4\",[]],[13],[0,\"Cart Items \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"popup-box\"],[13],[0,\"\\n         \"],[11,\"table\",[]],[13],[0,\"\\n\\n        \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"Name\"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"Qty\"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[0,\"Unit Price\"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"cartItem\"]]],null,{\"statements\":[[0,\"         \"],[11,\"tr\",[]],[13],[0,\"\\n          \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"fooditem_name\"]],false],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"item_quantity\"]],false],[0,\" \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"unit_price\"]],false],[0,\" \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\"]]],null,{\"statements\":[[0,\"          \"],[11,\"td\",[]],[13],[11,\"img\",[]],[15,\"src\",\"../assets/images/trash.png\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"deleteOrder\",[28,[\"index\"]],[28,[\"item\",\"fooditem_id\"]]],null],null],[15,\"height\",\"25px\"],[15,\"width\",\"25px\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"           \"],[14],[0,\"\\n\"]],\"locals\":[\"item\",\"index\"]},null],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"bottom-row\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[15,\"id\",\"grand-sum\"],[13],[0,\"Grand Total  Rs \"],[1,[26,[\"sum\"]],false],[0,\" \"],[14],[0,\"\\n\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"order\",[28,[\"sum\"]]]],[13],[0,\"Place Order\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "sample/templates/userhome.hbs" } });
});


define('sample/config/environment', ['ember'], function(Ember) {
  var prefix = 'sample';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("sample/app")["default"].create({"name":"sample","version":"0.0.0+1d7f31e4"});
}
//# sourceMappingURL=sample.map
