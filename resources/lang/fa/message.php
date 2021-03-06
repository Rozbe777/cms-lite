<?php

return [
    'success'   => [
        200 => 'درخواست با موفقیت انجام شد',
    ],
    'errors'    =>  [
        400 =>  'درخواست با خطا ارسال شده است.',
        401 =>  'احراز هویت شما با خطا مواجه شده است.',
        403 =>  'شما مجوز دسترسی به این صفحه را ندارید.',
        404 =>  'صفحه مدنظر یافت نشد.',
        405 =>  'نوع درخواست نامعتبر است.',
        419 =>  'صفحه منقضی شده است.',
        429 =>  'درخواست های شما بیش از حد مجاز است.',
        500 =>  'خطای سرور رخ داده است.',
        503 =>  'سرور در حال حاضر در دسترس نمیباشد.',
    ],
    'throttle'  =>  'درخواست های ارسالی شما بیش از حد مجاز است.لطفاً چند ثانیه دیگر مجدداً تلاش نمایید.',
    'sure'  =>  'آیا از انجام عملیات مدنظر اطمینان دارید؟',
    'site'  =>  [
        'comments'  =>  [
            'store' =>  [
                'successful'    =>  'دیدگاه شما با موفقیت ثبت شد.'
            ]
        ],
        'contact'  =>  [
            'store' =>  [
                'successful'    =>  'درخواست تماس شما با موفقیت ثبت شد.به زودی با شما تماس خواهیم گرفت.'
            ]
        ]
    ],
    'auth'  =>  [
        'login' =>  [
            'failed'        =>  'شماره تلفن همراه یا رمز عبور شما نامعتبر است.',
            'successful'    =>  'ورود به پنل با موفقیت انجام شد.',
        ],
        'logout'    =>  [
            'successful'    =>  'شما با موفقیت از حساب خود خارج شدید.',
        ],
        'register'  =>  [
            'agreement' =>  'قوانین و مقررات را خوانده ام و میپذیرم.',
            'notValid'  =>  'درخواست شما معتبر نمیباشد.',
            'enterToken'=>  'کد احراز هویت ارسال شده را وارد نمایید.',
            'alreadyRegistered'  =>  'حساب کاربری با این مشخصات از قبل وجود دارد.',
            'resendToken'   =>  [
                'successful'    =>  'کد احراز هویت با موفقیت ارسال شد.',
                'wait'          =>  'ثانیه دیگر تلاش نمایید.',
                'error'         =>  'درخواست شما با خطا مواجه شده است.لطفاْ صفحه را مجدداْ بارگذاری نمایید.'
            ],
            'wrongToken'    =>  'کد احراز هویت وارد شده معتبر نمیباشد.',
            'mobileVerified'  =>  'تایید شماره همراه با موفقیت انجام شد.',
            'successful'    =>  'ثبت نام شما با موفقیت انجام شد.',
            'error'         =>  'درخواست شما با خطا مواجه شده است.لطفاْ مجدداْ اطلاعات خود را بارگذاری نمایید.',
            'wrongMobile'   =>  'شماره همراه وارد شده یافت نشد.'
        ],
        'forgot'    =>  [
            'notValid'  =>  'درخواست شما معتبر نمیباشد.',
            'enterToken'=>  'کد احراز هویت ارسال شده را وارد نمایید.',
            'resendToken'   =>  [
                'successful'    =>  'کد احراز هویت با موفقیت ارسال شد.',
                'wait'          =>  'لطفاْ :seconds ثانیه دیگر تلاش نمایید.',
                'error'         =>  'درخواست شما با خطا مواجه شده است.لطفاْ صفحه را رفرش نمایید.'
            ],
            'wrongToken'    =>  'کد احراز هویت وارد شده معتبر نمیباشد.',
            'successful'    =>  'بازگردانی گذرواژه شما با موفقیت انجام شد.'
        ],
        'password'  =>  [
            'currentPasswordError'  =>  'گذرواژه فعلی معتبر نمیباشد.',
            'samePasswords'         =>  'گذرواژه فعلی و جدید نباید یکسان باشند.',
            'successful'            =>  'تغییر گذرواژه با موفقیت انجام شد.',
            'confirmation'          =>  'گذرواژه با تکرار آن یکسان نیست.',
            'confirmed'             =>  'تکرار گذرواژه الزامی است.',
            'min'          =>  'گذرواژه با تکرار آن یکسان نیست.',
            'userNotExist' => 'کاربری با این شماره همراه پیدا نشد.',

        ],
        'verification'  =>  [
            'notValid'  =>  'درخواست شما معتبر نمیباشد.',
            'enterToken'=>  'کد احراز هویت ارسال شده را وارد نمایید.',
            'resendToken'   =>  [
                'successful'    =>  'کد احراز هویت با موفقیت ارسال شد.',
                'wait'          =>  'لطفاْ :seconds ثانیه دیگر تلاش نمایید.',
                'error'         =>  'درخواست شما با خطا مواجه شده است.لطفاْ صفحه را رفرش نمایید.'
            ],
            'wrongToken'    =>  'کد احراز هویت وارد شده معتبر نمیباشد.',
            'successful'    =>  'تایید شما با موفقیت انجام شد.'
        ],
    ],
    'middlewares'   =>  [
        'notActive'     =>  'حساب کاربری شما غیرفعال می باشد.',
        'notComplete'   =>  'لطفاْ ابتدا :missedNeedle خود را :action نمایید.',
    ],
    'settings'  =>  [
        'update'    =>  [
            'successful'    =>  'تنظیمات نرم افزار با موفقیت بروز شد.'
        ]
    ],
    'roles' =>  [
        'store' =>  [
            'successful'    =>  'نقش جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'نقش مدنظر با موفقیت ویرایش شد.',
            'changed'       =>  'تغییر نقش شما با موفقیت انجام شد.',
            'notValid'      =>  'نقش ندنظر معتبر نمیباشد.',
        ],
        'destroy' =>  [
            'successful'    =>  'نقش مدنظر با موفقیت حذف شد.',
            'cantDeleteSuperAdmin'  =>  'نقش مدیر کل قابل حذف و ویرایش نمیباشد.',
        ]
    ],
    'admins' =>  [
        'store' =>  [
            'successful'    =>  'مدیر جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'مدیر مدنظر با موفقیت ویرایش شد.'
        ]
    ],
    'sliders'   =>  [
        'store' =>  [
            'successful'    =>  'اسلایدر جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'اسلایدر مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy'   =>  [
            'successful'    =>  'اسلایدر مدنظر با موفقیت حذف شد.'
        ]
    ],
    'content'   =>  [
        'store' =>  [
            'successful'    =>  'محتوا جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'محتوا مدنظر با موفقیت ویرایش شد.',
            'duplicate'     =>  'عنوان تکراری مورد قبول نمی باشد.'
        ],
        'destroy'   =>  [
            'successful'    =>  'محتوا مدنظر با موفقیت حذف شد.'
        ],
        'search'    =>  [
            'notSuccess'    =>  'محتوای مورد نظر یافت نشد.',
            'required'     =>  'وارد کردن فیلد مربوطه الزامی است'
        ],
    ],
    'about-us'  =>  [
        'update'    =>  [
            'successful'    =>  'صفحه درباره ما با موفقیت ویرایش شد.'
        ],
        'store' =>  [
            'successful'    =>  'درخواست شما با موفقیت ثبت شد.',
        ],
    ],
    'terms-and-conditions'  =>  [
        'update'    =>  [
            'successful'   =>  'قوانین و مقررات با موفقیت به روز شدند.'
        ],
    ],
    'articles' =>  [
        'store' =>  [
            'successful'    =>  'مقاله جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'مقاله مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy' =>  [
            'successful'    =>  'مقاله مدنظر با موفقیت حذف شد.',
        ]
    ],
    'categories' =>  [
        'store' =>  [
            'successful'    =>  'دسته جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'دسته مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy' =>  [
            'successful'    =>  'دسته مدنظر با موفقیت حذف شد.',
        ],
        'error' => [
            'parent_id'     =>  'parent_id وارد شده صحیح نمیباشد.'
        ]
    ],
    'tags' =>  [
        'store' =>  [
            'successful'    =>  'برچسب جدید با موفقیت ایجاد شد.'
        ],
        'update' =>  [
            'successful'    =>  'برچسب مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy' =>  [
            'successful'    =>  'برچسب مدنظر با موفقیت حذف شد.',
        ]
    ],
    'comments'  =>  [
        'update'    =>  [
            'successful'    =>  'دیدگاه مدنظر با موفقیت ویرایش شد.'
        ],
    ],
    'members'   =>  [
        'store' =>  [
            'successful'    =>  'عضو جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'عضو مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy'   =>  [
            'successful'    =>  'عضو مدنظر با موفقیت حذف شد.'
        ],
    ],
    'walletAddresses'   =>  [
        'store' =>  [
            'successful'    =>  'آدرس کیف پول جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'آدرس کیف پول مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy'   =>  [
            'successful'    =>  'آدرس کیف پول مدنظر با موفقیت حذف شد.'
        ],
        'isAllocated'       =>  'آدرس کیف پول مدنظر در حال استفاده میباشد.',
    ],
    'loanPackages'   =>  [
        'store' =>  [
            'successful'    =>  'بسته وام جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'بسته وام مدنظر با موفقیت ویرایش شد.'
        ],
        'destroy'   =>  [
            'successful'    =>  'بسته وام مدنظر با موفقیت حذف شد.'
        ],
    ],
    'wallets'   =>  [
        'deposit'   =>  [
            'failed'    =>  'در حال حاضر امکان واریز وجود ندارد.',
            'payment'   =>  [
                'successful'    =>  'واریز شما با موفقیت ثبت شد.',
                'failed'        =>  'پرداخت شما ناموفق بوده است.'
            ],
        ],
        'withdraws'     =>  [
            'store'                 =>  [
                'successful'        =>  'درخواست برداشت شما با موفقیت ثبت شد.',
                'insufficientBalance'   =>  'موجودی کیف پول شما کافی نمیباشد.',
                'failed'            =>  'ثبت درخواست برداشت با مشکل مواجه شده است.',
                'wrongBank'         =>  'بانک انتخاب شده معتبر نمیباشد.',
            ],
            'accept'    =>  [
                'successful'    =>  'درخواست برداشت مدنظر با موفقیت تایید شد.',
                'failed'        =>  'تایید درخواست برداشت با مشکل مواجه شده است.',
            ],
            'reject'    =>  [
                'successful'    =>  'درخواست برداشت مدنظر با موفقیت رد شد.',
                'failed'        =>  'رد کردن درخواست برداشت با مشکل مواجه شده است.',
            ],
            'cancel'    =>  [
                'successful'    =>  'انصراف از برداشت با موفقیت ثبت شد.',
                'failed'        =>  'انصراف از برداشت با مشکل مواجه شده است.',
            ],
        ],
    ],
    'loans'     =>  [
        'query' =>  [
            'noSuggestions'    =>  'پیشنهاد وام قابل ارائه ای یافت نشد.',
        ],
        'store' =>  [
            'activeLoansExceeded'   =>  'وام های فعال شما تکمیل شده است.',
            'notEnoughBalance'      =>  'موجودی حساب شما کمتر از وثیقه مورد نیاز است.',
            'successful'            =>  'درخواست وام شما با موفقیت ثبت شد.',
        ],
        'accept'    =>  [
            'successful'    =>  'وام مدنظر با موفقیت تایید شد.',
            'failed'        =>  'تایید وام ناموفق بوده است.',
            'creditNotFound'=>  'تایید وام به علت موجود نبودن کارت اعتباری ناموفق بوده است.',
        ],
        'decline'   =>  [
            'successful'    =>  'وام مدنظر با موفقیت رد شد.',
            'failed'        =>  'رد کردن وام ناموفق بوده است.'
        ],
        'cancel'    =>  [
            'successful'    =>  'انصراف از وام مدنظر با موفقیت ثبت شد.',
            'failed'        =>  'انصراف از وام مدنظر ناموفق بوده است.'
        ],
        'payment'   =>  [
            'successful'    =>  'پرداخت شما با موفقبت ثبت شد.',
            'failed'        =>  'پرداخت شما ناموفق بوده است.'
        ],
        'lend'      =>  [
            'successful'    =>  'تامین مالی وام با موفقیت انجام شد.',
            'notValid'      =>  'وام مدنظر در شرایط تامین مالی نیست.',
            'sameBorrower'  =>  'تامین کننده وام نمیتواند وام گیرنده نیز باشد.',
            'insufficientBalance'   =>  'موجودی حساب شما برای تامین مالی وام کافی نمیباشد.',
        ],
    ],
    'users' =>  [
        'update' =>  [
            'successful'    =>  'کاربر مدنظر با موفقیت ویرایش شد.'
        ]
    ],
    'creditCards'   =>  [
        'store'     =>  [
            'successful'    =>  'کارت اعتباری جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'ویرایش کارت اعتباری مدنظر با موفقیت انجام شد.',
        ],
        'destroy'   =>  [
            'successful'    =>  'کارت اعتباری مدنظر با موفقیت حذف شد.'
        ],
        'isAllocated'   =>  'کارت اعتباری مدنظر استفاده شده است.'
    ],
    'tickets'   =>  [
        'store' =>  [
            'successful'    =>  'تیکت جدید با موفقیت ایجاد شد.',
        ],
        'answer'    =>  [
            'successful'    =>  'پاسخ به تیکت با موفقیت ثبت شد.',
        ],
        'close' =>  [
            'successful'    =>  'تیکت مدنظر با موفقیت بسته شد.',
        ],
    ],
    'coupon'  =>  [
      'code' =>  [
          'duplicate' => 'الزامی: کد کوپن صادره باید غیر تکراری وارد شود'
      ],
        'validation' => [
            'error' => [
                'expired' => "کد تخفیف وارد شده منقضی گشته است.",
                'access' => "شما مجوز استفاده از این کد تخفیف را ندارید.",
                'inclusive' => 'کد تخفیف وارد شده شامل این سبد خرید نمی شود.',
                'none' => 'کد تخفیف وارد شده معتبر نمیباشد.'
            ]
        ]
    ],
    'profile'   =>  [
        'update'    =>  [
            'successful'    =>  'پروفایل شما با موفقیت ویرایش شد.',
        ],
    ],
    'faqs'      =>  [
        'store' =>  [
            'successful'    =>  'سوال متداول جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'سوال متداول مدنظر با موفقیت ویرایش شد.',
        ],
        'destroy'   =>  [
            'successful'    =>  'سوال متداول مدنظر با موفقیت حذف شد.'
        ],
    ],
    'staffs'    =>  [
        'store' =>  [
            'successful'    =>  'عضو جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'عضو مدنظر با موفقیت ویرایش شد.',
        ],
        'destroy'   =>  [
            'successful'    =>  'عضو مدنظر با موفقیت حذف شد.'
        ],
    ],
    'coupons'   =>  [
        'store' =>  [
            'successful'    =>  'کد تخفیف جدید با موفقیت ایجاد شد.',
        ],
        'update'    =>  [
            'successful'    =>  'کد تخفیف مدنظر با موفقیت ویرایش شد.',
        ],
        'destroy'   =>  [
            'successful'    =>  'کد تخفیف مدنظر با موفقیت حذف شد.',
        ],
        'validation'    =>  [
            'wrongCode' =>  'کد تخفیف معتبر نیست.',
            'notActive' =>  'کد تخفیف غیر فعال است.',
            'notAfterIsValidFrom'   =>  'تاریخ اعتبار کد تخفیف شروع نشده است.',
            'notBeforeIsValidUntil' =>  'تاریخ اعتبار کد تخفیف به اتمام رسیده است.',
            'reachedSuppliesLimit'  =>  'تعداد استفاده از کد تخفیف به اتمام رسیده است.',
        ],
        'isUsed'        =>  'کد تخفیف مدنظر استفاده شده است.',
        'apply' =>  [
            'successful'    =>  'تبریک! کد تخفیف :coupon معتبر است و :amount تخفیف برای شما محاسبه خواهد شد.',
        ],
    ],
    'cart' => [
        'checkout' => [
            'error' => [
                'empty' => 'سبد خرید شما خالی میباشد.',
                'remaining' => 'موجودی انبار کافی نمیباشد',
                'attribute_id' => 'شناسه محصول معتبر نمیباشد',
            ],
        ],
    ],
    'bankAccounts' =>  [
        'store' =>  [
            'successful'    =>  'حساب بانکی جدید با موفقیت ثبت شد.',
        ],
        'update'    =>  [
            'successful'    =>  'حساب بانکی با موفقیت ویرایش شد.',
        ],
        'destroy'   =>  [
            'successful'    =>  'حساب بانکی با موفقیت حذف شد.',
        ],
    ],
    'referrals' =>  [
        'submitReferrer'    =>  [
            'successful'    =>  'ثبت معرف با موفقیت انجام شد.',
            'wrongReferralToken'    =>  'کد معرف وارد شده معتبر نمیباشد.',
        ],
    ],
];
