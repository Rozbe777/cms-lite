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
require('./components/Profile/Address');
require('./components/Profile/index');

require('./components/Setting/General');
require('./components/Setting/JsAndCss');
require('./components/User/CreateUser');
require('./components/User/PasswordSet');
require('./components/User/UpdateUser');
require("./components/Admin/UserList/UserList");


require("./components/Admin/Category/Component/CategoryAdd");
require("./components/Admin/Category/Component/CategoryList");
require("./components/Admin/Category/Component/CategoryDuplicate");
require("./components/Admin/Category/Component/CategoryEdit");


require('./components/Admin/Page/Component/PageList')
require('./components/Admin/Page/Component/PageAdd')
require('./components/Admin/Page/Component/PageEdit')
require('./components/Admin/Page/Component/PageDuplicate')


require('./components/Admin/Shop/component/ProductAdd')
require('./components/Admin/Shop/component/ProductList')
require('./components/Admin/Shop/component/ProductDuplicate')
require('./components/Admin/Shop/component/ProductEdit')


require("./components/Admin/Content/Component/ContentEdit");
require("./components/Admin/Content/Component/ContentAdd");
require("./components/Admin/Content/Component/ContentDuplicate");
require("./components/Admin/Content/Component/ContentFormParent");
require("./components/Admin/Content/Component/ContentList");
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

