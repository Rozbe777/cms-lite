<?php

namespace Database\Seeders;


use App\Models\SaleChannel;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SettingSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UserSeeder::class);
        //$this->call(ContentSeeder::class);
        $this->call(TagSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(ThemeSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(GatewaySeeder::class);
        $this->call(BankSeeder::class);
        $this->call(TransactionTypeSeeder::class);
        $this->call(CouponSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(InvoiceSeeder::class);
        $this->call(SaleChannelSeeder::class);
        $this->call(ModuleIdSeeder::class);
        $this->call(AddressSeeder::class);
        $this->call(TransferSeeder::class);
    }
}
