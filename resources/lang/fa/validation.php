<?php

return array(

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    "accepted" => ":attribute باید پذیرفته شده باشد.",
    "active_url" => "آدرس :attribute معتبر نیست",
    "after" => ":attribute باید تاریخی بعد از :date باشد.",
    "alpha" => ":attribute باید شامل حروف الفبا باشد.",
    "alpha_dash" => ":attribute باید شامل حروف الفبا و عدد و خظ تیره(-) باشد.",
    "alpha_num" => ":attribute باید شامل حروف الفبا و عدد باشد.",
    "array" => ":attribute باید شامل آرایه باشد.",
    "before" => ":attribute باید تاریخی قبل از :date باشد.",
    "between" => array(
        "numeric" => ":attribute باید بین :min و :max باشد.",
        "file" => ":attribute باید بین :min و :max کیلوبایت باشد.",
        "string" => ":attribute باید بین :min و :max کاراکتر باشد.",
        "array" => ":attribute باید بین :min و :max آیتم باشد.",
    ),
    "boolean" => "The :attribute field must be true or false",
    "confirmed" => ":attribute با تاییدیه مطابقت ندارد.",
    "date" => ":attribute یک تاریخ معتبر نیست.",
    "date_format" => ":attribute با الگوی :format مطاقبت ندارد.",
    "different" => ":attribute و :other باید متفاوت باشند.",
    "digits" => ":attribute باید :digits رقم باشد.",
    "digits_between" => ":attribute باید بین :min و :max رقم باشد.",
    "email" => "فرمت :attribute معتبر نیست.",
    "mobile" => "فرمت :attribute معتبر نیست.",
    "exists" => ":attribute انتخاب شده، یافت نشد و یا معتبر نمیباشد.",
    "image" => "فرمت :attribute معتبر نیست.",
    "avatar" => "فرمت :attribute معتبر نیست.",
    "in" => ":attribute انتخاب شده، معتبر نیست.",
    "integer" => ":attribute باید نوع داده ای عددی (integer) باشد.",
    "ip" => ":attribute باید IP آدرس معتبر باشد.",
    "max" => array(
        "numeric" => ":attribute نباید بزرگتر از :max باشد.",
        "file" => ":attribute نباید بزرگتر از :max کیلوبایت باشد.",
        "string" => ":attribute نباید بیشتر از :max کاراکتر باشد.",
        "array" => ":attribute نباید بیشتر از :max آیتم باشد.",
    ),
    'lt' => [
        'numeric' => ':attribute باید کمتر از :value باشد '
    ],
    'lte' => [
        'numeric' => ':attribute باید کمتر یا برابر از :value باشد '
    ],

    "mimes" => ":attribute باید یکی از فرمت های :values باشد.",
    "min" => array(
        "numeric" => ":attribute نباید کوچکتر از :min باشد.",
        "file" => ":attribute نباید کوچکتر از :min کیلوبایت باشد.",
        "string" => ":attribute نباید کمتر از :min کاراکتر باشد.",
        "array" => ":attribute نباید کمتر از :min آیتم باشد.",
    ),
    "not_in" => ":attribute انتخاب شده، معتبر نیست.",
    "numeric" => ":attribute باید شامل عدد باشد.",
    "regex" => ":attribute یک فرمت معتبر نیست",
    "required" => "فیلد :attribute الزامی است",
    "required_if" => "فیلد :attribute هنگامی که :other برابر با :value است، الزامیست.",
    "required_with" => ":attribute الزامی است زمانی که :values موجود است.",
    "required_with_all" => ":attribute الزامی است زمانی که :values موجود است.",
    "required_without" => ":attribute الزامی است زمانی که :values موجود نیست.",
    "required_without_all" => ":attribute الزامی است زمانی که :values موجود نیست.",
    "same" => ":attribute و :other باید مانند هم باشند.",

    "size" => array(
        "numeric" => ":attribute باید برابر با :size باشد.",
        "file" => ":attribute باید برابر با :size کیلوبایت باشد.",
        "string" => ":attribute باید برابر با :size کاراکتر باشد.",
        "array" => ":attribute باسد شامل :size آیتم باشد.",
    ),
    "timezone" => "The :attribute must be a valid zone.",
    "unique" => ":attribute قبلا انتخاب شده است.",
    'gt' => [
        'numeric' =>  ":attribute باید بزرگتر از صفر و کمتر از موجودی باشد.",
    ],
    'lt' => [
        'numeric'  =>  ":attribute باید کمتر از موجودی باشد.",
    ],
    'distinct' => ':attribute مقدار تکراری دارد.',

    "url" => "فرمت آدرس :attribute اشتباه است.",
    "uploaded" => ":attribute آپلود نشد ",

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => array(),

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */
    'attributes' => array(
        "name" => "نام",
        "username" => "نام کاربری",
        "email" => "پست الکترونیکی",
        "first_name" => "نام",
        "last_name" => "نام خانوادگی",
        "password" => "رمز عبور",
        "current_password" => "تاییدیه ی رمز عبور",
        "password_confirmation" => "رمز عبور فعلی",
        "city" => "شهر",
        "avatar" => "تصویر شاخص",
        "country" => "کشور",
        "address" => "نشانی",
        "phone" => "شماره تلفن",
        "mobile" => "تلفن همراه",
        "age" => "سن",
        "sex" => "جنسیت",
        "gender" => "جنسیت",
        "day" => "روز",
        "month" => "ماه",
        "year" => "سال",
        "hour" => "ساعت",
        "minute" => "دقیقه",
        "second" => "ثانیه",
        "title" => "عنوان",
        "text" => "متن",
        "content" => "محتوا",
        "description" => "توضیحات",
        "excerpt" => "گلچین کردن",
        "date" => "تاریخ",
        "time" => "زمان",
        "available" => "موجود",
        "size" => "اندازه",
        "role" => 'دسترسی',
        "slug" => "متن شاخص",
        "status" => "وضعیت",
        "logo" => "لوگو",
        "price" => "مبلغ",
        "attributes.*.price" => "مبلغ کالا",
        "attributes.*.product_code" => "کد کالا",
        "attributes.*.limit" => "حداکثر تعداد مجاز خرید این کالا ",
        "attributes.*.count" => "تعداد این کالا",
        "features.*.color" => "رنگ کالا",
        "features.*.name" => "ردیف ویژگی",
        "features.*.title" => "عنوان ویژگی",
        "features.*.value" => "مقدار ویژگی",
        "tag_list" => "لیست برچسب ها",
        "categoryIds" => "لیست دسته بندی ها",
        "file" => "فایل",
        // custom
        "identity_card_number" => "شماره شناسنامه",
        "national_identity_number" => "شماره ملی",
        "city_id" => "شهر",
        "post_code" => "کد پستی",
        "bank_id" => "بانک",
        "account_number" => "شماره حساب",
        "card_number" => "شماره کارت",
        "sheba_no" => "شماره شبا",
        "contract_id" => "قرار داد",
        "store_title" => "نام فروشگاه",
        "store_category_id" => "دسته بندی فروشگاه",
        "birth_certificate" => "شناسنامه",
        "identity_card" => "کارت ملی",
        "birth_date" => "تاریخ تولد",
        "polyester" => "پلی استر",
        "weight" => "وزن",
        "with" => "عرض",
        "lacra" => "لاکرا",
        "season" => "فصل",
        "texture_id" => "بافت",
        "design_id" => "طرح",
        "fabric_type_id" => "نوع پارچه",
        "features" => "ویژگی ها",
        "fabric_sample" => "نمونه پارچه",
        "fabric_view_box" => "پارچه نما",
        "guarantee" => "گارانتی",


        // params
        "min-unit-price"=>"حداقل قیمت واحد",
        "max-unit-price"=>"حداکثر قیمت واحد",
        "min-discount"=>"حداقل تخفیف",
        "max-discount"=>"حداکثر تخفیف",
        "min-commission"=>"حداقل کمیسیون",
        "max-commission"=>"حداکثر کمیسیون",
        "min-final-price"=>"حداقل قیمت نهایی",
        "max-final-price"=>"حداکثر قیمت نهایی",
        "min-views"=>"حداقل تعداد مشاهده",
        "max-views"=>"حداکثر تعداد مشاهده",
        "min-inventory"=>"حداقل موجودی",
        "max-inventory"=>"جداکثر موجودی",
        "min-favorites"=>"حداقل تعداد مورد پسند ",
        "max-favorites"=>"حداکثر تعداد مورد پسند",
        "min-comments"=>"حداقل تعداد دیدگاه",
        "max-comments"=>"حداکثر تعداد دیدگاه",
        "count"=>"تعداد",
        "sewing-id"=>"نمونه دوخت",
        "color-id"=>"رنگ",
        "company-id"=>"شرکت",
        "texture-id"=>"بافت",
        "design-id"=>"طرح",
        "fabric-type-id"=>"نوع پارچه",
        "start-date"=>"تاریخ شروع",
        "end-date"=>"تاریخ پایان",
        "per-page"=>"هر صفحه",
        "sewing_ids"=>"دوخت",
        "sewing_ids.*"=>"دوخت",
        "season_ids"=>"فصل",
        "season_ids.*"=>"فصل",
        "instance"=>"ویژگی",
        "instance.*.price"=>"قیمت ویژگی",
        "instance.*.color_id"=>"رنگ ویژگی",
        "instance.*.inventory"=>"موجودی ویژگی",
        "product_category_id"=>"دسته بندی محصول",
        "main_image"=>"تصویر اصلی",
        "images"=>"تصاویر",
        "image"=>"تصویر",
        "images.*.file"=>"تصویر محصول",
        "images.*.alt"=>"توضیحات تصویر",
        "current_images.*.alt"=>"توضیحات تصویر",
        "current_images.*.url"=>"ادرس تصویر",
        "address_id"=>"آدرس"

    ),
);
