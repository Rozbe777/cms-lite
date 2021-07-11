/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

//require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Auth/Login');
require('./components/Auth/Loading');
require('./components/Auth/RePass/MobileVerify');
require('./components/Auth/Register/Index');
require('./components/Profile/Profile');
require('./components/Profile/ChangePassword');
require('./components/Setting/General');
require('./components/Setting/JsAndCss');
require('./components/User/CreateUser');
require('./components/User/PasswordSet');
require('./components/User/UpdateUser');
require("./components/Admin/UserList/UserList");


/*require("./components/Admin/Category/CategoryList");*/
require("./components/Admin/Category/V1/Category");
require("./components/Admin/Category/CategoryAdd");


require("./components/Admin/Page/PageAdd");
require("./components/Admin/Page/PageList");
require("./components/Admin/Content/ContentAdd");
require("./components/Admin/Content/ContentList");
require("./components/Admin/Dasboard");
require("./components/Admin/Shop/ProductManager");
require("./components/Admin/Shop/ProductAdd");
require("./components/Admin/Shop/Search");
require("./components/Admin/FormCreator");
require("./components/Admin/ThemeSetting");
require("./components/Checkout");
require("./components/Checkout/CheckBascket");
require("./components/Checkout/SendDetail");
require("./components/Admin/Discount/AddDiscount");
require("./components/Admin/Discount/ShowDiscount");

