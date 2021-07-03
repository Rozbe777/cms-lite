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
    'setting' => [
        [
            'name' => 'general',
            'display_name' => 'general',
            'status' => 'active',
            'value' => [
                [
                    'name' => 'work_time',
                    'display_name' => 'ساعت کاری',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        'icon' => [
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-time-line',
                            'visible' => 1,
                        ],
                        'title' => [
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'شنبه - جمعه: ',
                            'visible' => 1,
                        ],
                        'description' => [
                            'display_name' => 'توضیحات',
                            'type' => 'text',
                            'value' => '8:00 صبح - 9:00 عصر',
                            'visible' => 1,
                        ]
                    ]
                ],
                [
                    'name' => 'work_time',
                    'display_name' => 'ساعت کاری',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        'icon' => [
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-time-line',
                        ],
                        'title' => [
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'شنبه - جمعه: ',
                        ],
                        'description' => [
                            'display_name' => 'توضیحات',
                            'type' => 'text',
                            'value' => '8:00 صبح - 9:00 عصر',
                        ]
                    ]
                ],
                [
                    'name' => 'work_time',
                    'display_name' => 'ساعت کاری',
                    'type' => 'box',
                    'visible' => 1,
                    'value' => [
                        'icon' => [
                            'display_name' => 'آیکون',
                            'type' => 'icon',
                            'value' => 'ri-time-line',
                        ],
                        'title' => [
                            'display_name' => 'عنوان',
                            'type' => 'text',
                            'value' => 'شنبه - جمعه: ',
                        ],
                        'description' => [
                            'display_name' => 'توضیحات',
                            'type' => 'text',
                            'value' => '8:00 صبح - 9:00 عصر',
                        ]
                    ]
                ]

            ]
        ]

    ]
];
