'use strict';

define('sample/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/adminhome.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/adminhome.js should pass ESLint\n\n49:7 - Unexpected \'debugger\' statement. (no-debugger)\n205:26 - \'response\' is defined but never used. (no-unused-vars)\n227:26 - \'response\' is defined but never used. (no-unused-vars)\n245:26 - \'response\' is defined but never used. (no-unused-vars)\n302:24 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n20:11 - \'response\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/registration.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/registration.js should pass ESLint\n\n30:26 - \'response\' is defined but never used. (no-unused-vars)\n35:24 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/userhome.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/userhome.js should pass ESLint\n\n213:28 - \'resulttext\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/adminhome.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/adminhome.js should pass ESLint\n\n17:3 - Unexpected \'debugger\' statement. (no-debugger)');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass ESLint\n\n7:5 - Unexpected \'debugger\' statement. (no-debugger)');
  });

  QUnit.test('routes/registration.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/registration.js should pass ESLint\n\n');
  });

  QUnit.test('routes/userhome.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/userhome.js should pass ESLint\n\n14:5 - Unexpected \'debugger\' statement. (no-debugger)\n18:5 - Unexpected \'debugger\' statement. (no-debugger)');
  });
});
define('sample/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('sample/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'sample/tests/helpers/start-app', 'sample/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('sample/tests/helpers/resolver', ['exports', 'sample/resolver', 'sample/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('sample/tests/helpers/start-app', ['exports', 'sample/app', 'sample/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('sample/tests/test-helper', ['sample/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('sample/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/adminhome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/adminhome-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/registration-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/registration-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/userhome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/userhome-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/adminhome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/adminhome-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/registration-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/registration-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/userhome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/userhome-test.js should pass ESLint\n\n');
  });
});
define('sample/tests/unit/controllers/adminhome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:adminhome', 'Unit | Controller | adminhome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('sample/tests/unit/controllers/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('sample/tests/unit/controllers/registration-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:registration', 'Unit | Controller | registration', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('sample/tests/unit/controllers/userhome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:userhome', 'Unit | Controller | userhome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('sample/tests/unit/routes/adminhome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:adminhome', 'Unit | Route | adminhome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('sample/tests/unit/routes/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('sample/tests/unit/routes/registration-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:registration', 'Unit | Route | registration', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('sample/tests/unit/routes/userhome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:userhome', 'Unit | Route | userhome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('sample/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
