<?php
return [
    'general' => [
        'name' => 'parsa',
        'display_name' => 'پارسا',
        'developer' => 'زیروان',
        'developer_link' => 'http://zerone.team',
        'is_default' => true,
        'description' => 'پوسته شرکتی پارسا',

    ],
    'pages' => [
        [
            'title' => 'صفحه اصلی',
            'content' => '<p>متن صفحه اصلی</p>',
            'is_index' => 1,
            'published_at' => now(),
        ],
    ],
    'settings' => [
        [
            'name' => 'general',
            'display_name' => 'عمومی',
            'status' => 'active',
            'value' => [
                [
                    'name' => 'work_time',
                    'display_name' => 'ساعت کاری',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        [
                            'name' => 'icon',
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-time-line',
                            'visible' => 1,
                        ],
                        [
                            'name' => 'title',
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'شنبه - جمعه: ',
                            'visible' => 1,
                        ],
                        [
                            'name' => 'description',
                            'display_name' => 'توضیحات',
                            'type' => 'text',
                            'value' => '8:00 صبح - 9:00 عصر',
                            'visible' => 1,
                        ]
                    ]
                ],
                [
                    'name' => 'address',
                    'display_name' => 'آدرس',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        [
                            'name' => 'icon',
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-map-pin-2-line',
                            'visible' => 1,
                        ],
                        [
                            'name' => 'title',
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'دفتر: ',
                            'visible' => 1,
                        ],
                        [
                            'name' => 'description',
                            'display_name' => 'توضیحات',
                            'type' => 'text',
                            'value' => 'استان تهران ، میدان آزادی',
                            'visible' => 1,
                        ]
                    ]
                ],
                [
                    'name' => 'description',
                    'display_name' => 'توضیحات',
                    'type' => 'textarea',
                    'visible' => 1,
                    'value' => 'لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.'
                ],
                [
                    'name' => 'contact',
                    'display_name' => 'تماس با ما',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        [
                            'name' => 'title',
                            'display_name' => 'عنوان',
                            'type' => 'icon',
                            'value' => 'ri-time-line',
                            'visible' => 1,
                        ],

                        [
                            'name' => 'description',
                            'display_name' => 'توضیحات',
                            'type' => 'textarea',
                            'value' => 'تماس بگیرید: +(1) 814 482 2296<br/>ایمیل: hello@enry.com',
                            'visible' => 1,
                        ]
                    ]
                ],

            ]
        ],
        [
            'name' => 'logo',
            'display_name' => 'لوگو',
            'status' => 'active',
            'value' => [
                [
                    'name' => 'logo',
                    'display_name' => 'لوگو اصلی',
                    'type' => 'image',
                    'visible' => 1,
                    'value' => 'img/logo.png'
                ],
                [
                    'name' => 'logo_light',
                    'display_name' => 'لوگو روشن',
                    'type' => 'image',
                    'visible' => 1,
                    'value' => 'img/white-logo.png'
                ],
            ]
        ],
        [
            'name' => 'working_time',
            'display_name' => 'ساعات کاری',
            'status' => 'active',
            'value' => [
                [
                    'name' => 'work_time',
                    'display_name' => 'ساعت کاری',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        [
                            'name' => 'title',
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'ساعت های کاری',
                            'visible' => 1,
                        ],
                        [
                            'description' => 'title',
                            'display_name' => 'توضیحات',
                            'type' => 'textarea',
                            'value' => '<ul class="opening-hours"><li>شنبه - جمعه: <span>8:00 صبح - 9:00 عصر</span></li><li>سه شنبه: <span>8:00 صبح - 9:00 عصر</span></li><li>چهارشنبه: <span>8:00 صبح - 9:00 عصر</span></li><li>پنجشنبه: <span>8:00 صبح - 9:00 عصر</span></li><li>جمعه: <span>تعطیل</span></li></ul>',
                            'visible' => 1,
                        ]
                    ]
                ],


            ]
        ]

    ],
    'contents' => [
        [
            'title' => 'راز موفقیت کسب و کار خود را به سرعت پیدا کنید',
            'content' => '<p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد.</p>',
            'published_at' => now(),
            'image'=>'img/blog/blog1.jpg'
        ],
        [
            'title' => 'راز موفقیت کسب و کار خود را به سرعت پیدا کنید',
            'content' => '<p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد.</p>',
            'published_at' => now(),
            'image'=>'img/blog/blog2.jpg'
        ],
        [
            'title' => 'راز موفقیت کسب و کار خود را به سرعت پیدا کنید',
            'content' => '<p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد.</p>',
            'published_at' => now(),
            'image'=>'img/blog/blog3.jpg'
        ],
    ],
    'components' => [
        [
            'name' => 'slider',
            'type' => 'component',
            'image' => 'slider.png',
            'display_name' => 'اسلایدر تمام صفحه',
            'initial_payload' => [
                [
                    'name' => 'limit',
                    'display_name' => 'محدودیت نمایش',
                    'type' => 'text',
                    'value' => 3
                ]
            ],
            'initial_item_payload' => [
                [
                    'name' => 'first_button',
                    'display_name' => 'دکمه اصلی',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        [
                            'name' => 'icon',
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-arrow-left-line'
                        ],
                        [
                            'name' => 'title',
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'دکمه اصلی'
                        ],
                        [
                            'name' => 'link',
                            'display_name' => 'لینک',
                            'type' => 'link',
                            'value' => '#'
                        ],
                    ]
                ],
                [
                    'name' => 'second_button',
                    'display_name' => 'دکمه دوم',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        [
                            'name' => 'icon',
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-arrow-left-line'
                        ],
                        [
                            'name' => 'title',
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'دکمه دوم'
                        ],
                        [
                            'name' => 'link',
                            'display_name' => 'لینک',
                            'type' => 'link',
                            'value' => '#'
                        ],

                    ]
                ],
                [
                    'name' => 'background',
                    'display_name' => 'دکمه دوم',
                    'type' => 'image',
                    'value' => 'img/banner/banner-bg1.jpg',
                    'visible' => 1,
                ]
            ],
            'items' => [
                [
                    'title' => 'مشاور بازرگانی و خط شبکه برای شما',
                    'content' => 'لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم<br/>ایپسوم ساختار چاپ و متن را در بر می گیرد.',
                    'image' => 'img/banner/banner1.png',
                    'payload' => [
                        [
                            'name' => 'first_button',
                            'display_name' => 'دکمه اصلی',
                            'type' => 'box',
                            'visible' => 1,
                            'value' => [
                                [
                                    'name' => 'icon',
                                    'display_name' => 'آیکون',
                                    'type' => 'icon',
                                    'value' => 'ri-arrow-left-line'
                                ],
                                [
                                    'name' => 'title',
                                    'display_name' => 'عنوان',
                                    'type' => 'text',
                                    'value' => 'دکمه اصلی'
                                ],
                                [
                                    'name' => 'link',
                                    'display_name' => 'لینک',
                                    'type' => 'link',
                                    'value' => '#'
                                ],
                            ]
                        ],
                        [
                            'name' => 'second_button',
                            'display_name' => 'دکمه دوم',
                            'type' => 'box',
                            'visible' => 1,
                            'value' => [
                                [
                                    'name' => 'icon',
                                    'display_name' => 'آیکون',
                                    'type' => 'icon',
                                    'value' => 'ri-arrow-left-line'
                                ],
                                [
                                    'name' => 'title',
                                    'display_name' => 'عنوان',
                                    'type' => 'text',
                                    'value' => 'دکمه دوم'
                                ],
                                [
                                    'name' => 'link',
                                    'display_name' => 'لینک',
                                    'type' => 'link',
                                    'value' => '#'
                                ],

                            ]
                        ],
                        [
                            'name' => 'background',
                            'display_name' => 'تصویر زمینه',
                            'type' => 'image',
                            'value' => 'img/banner/banner-bg4.jpg',
                            'visible' => 1,
                        ]
                    ]
                ],
                [
                    'title' => 'مشاور بازرگانی و خط شبکه برای شما',
                    'content' => 'لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم<br/>ایپسوم ساختار چاپ و متن را در بر می گیرد.',
                    'image' => 'img/banner/banner2.png',
                    'payload' => [
                        [
                            'name' => 'first_button',
                            'display_name' => 'دکمه اصلی',
                            'type' => 'box',
                            'visible' => 1,
                            'value' => [
                                [
                                    'name' => 'icon',
                                    'display_name' => 'آیکون',
                                    'type' => 'icon',
                                    'value' => 'ri-arrow-left-line'
                                ],
                                [
                                    'name' => 'title',
                                    'display_name' => 'عنوان',
                                    'type' => 'text',
                                    'value' => 'دکمه اصلی'
                                ],
                                [
                                    'name' => 'link',
                                    'display_name' => 'لینک',
                                    'type' => 'link',
                                    'value' => '#'
                                ],
                            ]
                        ],
                        [
                            'name' => 'second_button',
                            'display_name' => 'دکمه دوم',
                            'type' => 'box',
                            'visible' => 1,
                            'value' => [
                                [
                                    'name' => 'icon',
                                    'display_name' => 'آیکون',
                                    'type' => 'icon',
                                    'value' => 'ri-arrow-left-line'
                                ],
                                [
                                    'name' => 'title',
                                    'display_name' => 'عنوان',
                                    'type' => 'text',
                                    'value' => 'دکمه دوم'
                                ],
                                [
                                    'name' => 'link',
                                    'display_name' => 'لینک',
                                    'type' => 'link',
                                    'value' => '#'
                                ],

                            ]
                        ],
                        [
                            'name' => 'background',
                            'display_name' => 'تصویر زمینه',
                            'type' => 'image',
                            'value' => 'img/banner/banner-bg2.jpg',
                            'visible' => 1,
                        ]
                    ]
                ],
                [
                    'title' => 'مشاور بازرگانی و خط شبکه برای شما',
                    'content' => 'لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم<br/>ایپسوم ساختار چاپ و متن را در بر می گیرد.',
                    'image' => 'img/banner/banner3.png',
                    'payload' => [
                        [
                            'name' => 'first_button',
                            'display_name' => 'دکمه اصلی',
                            'type' => 'box',
                            'visible' => 1,
                            'value' => [
                                [
                                    'name' => 'icon',
                                    'display_name' => 'آیکون',
                                    'type' => 'icon',
                                    'value' => 'ri-arrow-left-line'
                                ],
                                [
                                    'name' => 'title',
                                    'display_name' => 'عنوان',
                                    'type' => 'text',
                                    'value' => 'دکمه اصلی'
                                ],
                                [
                                    'name' => 'link',
                                    'display_name' => 'لینک',
                                    'type' => 'link',
                                    'value' => '#'
                                ],
                            ]
                        ],
                        [
                            'name' => 'second_button',
                            'display_name' => 'دکمه دوم',
                            'type' => 'box',
                            'visible' => 1,
                            'value' => [
                                [
                                    'name' => 'icon',
                                    'display_name' => 'آیکون',
                                    'type' => 'icon',
                                    'value' => 'ri-arrow-left-line'
                                ],
                                [
                                    'name' => 'title',
                                    'display_name' => 'عنوان',
                                    'type' => 'text',
                                    'value' => 'دکمه دوم'
                                ],
                                [
                                    'name' => 'link',
                                    'display_name' => 'لینک',
                                    'type' => 'link',
                                    'value' => '#'
                                ],

                            ]
                        ],
                        [
                            'name' => 'background',
                            'display_name' => 'تصویر زمینه',
                            'type' => 'image',
                            'value' => 'img/banner/banner-bg3.jpg',
                            'visible' => 1,
                        ]
                    ]
                ],
            ]
        ],
        [
            'name' => 'blog',
            'type' => 'category',
            'type_id' => 0,
            'image' => 'blog.png',
            'display_name' => 'وبلاگ',
            'initial_payload' => [
                [
                    'name' => 'title',
                    'display_name' => 'عنوان',
                    'type' => 'text',
                    'visible' => 1,
                    'value' => 'با وبلاگ های ما آشنا شوید'
                ],
                [
                    'name' => 'description',
                    'display_name' => 'توضیحات',
                    'type' => 'text',
                    'visible' => 1,
                    'value' => 'لورم ایپسوم متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد.'
                ],
                [
                    'name' => 'limit',
                    'display_name' => 'محدودیت نمایش',
                    'type' => 'text',
                    'value' => 3
                ]
            ],
        ]
    ],
];
