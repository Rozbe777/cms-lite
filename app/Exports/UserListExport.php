<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;


class UserListExport implements FromCollection, WithTitle, WithMapping, WithHeadings, ShouldAutoSize, WithEvents
{



    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();

    }



    public function headings(): array
    {
        return [
            'شماره',
            'نام',
            'فامیلی',
            'موبایل',
            'ایمیل',
            'وضعیت',
            'تاریخ ثبت نام'

        ];
    }

    public function map($user): array
    {
        try {
            $array=[
                $user->id,
                $user->name,
                $user->family,
                $user->phone,
                $user->email,
                $user->status,
                $user->created_at,


            ];
            return $array;
        }
        catch (\Exception $e){
            dd($e);
            return response($e,402);
        }

    }



    public function title(): string
    {
        return 'لیست کاربران';
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
            },
        ];
    }
}
