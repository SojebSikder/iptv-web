<?php

namespace Database\Seeders;

use App\Models\Tv;
use Illuminate\Database\Seeder;

class TvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Tv::create([
            'id' => '1',
            'title' => '9x Jalwa',
            'link' => 'https://m-c01-j2apps.s.llnwi.net/live/0781.9XJalwa.in_480p/index.m3u8',
            'category_id' => '3',
        ]);
        Tv::create([
            'id' => '2',
            'title' => 'Al Jazeera',
            'link' => 'https://live-hls-web-aje.getaj.net/AJE/01.m3u8',
            'category_id' => '4',
        ]);
        Tv::create([
            'id' => '3',
            'title' => 'Bijoy TV',
            'link' => 'https://tempx.jagobd.com:441/c5V6mmMyX7RpbEU9Mi8xNy8yMDEOGIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PT0mdFsaWRtaW51aiPhnPTI/bijoy00.stream/chunks.m3u8',
            'category_id' => '1',
        ]);
        Tv::create([
            'id' => '4',
            'title' => 'Boishakhi TV',
            'link' => 'http://iptvbd.jagobd.com:1931/boishakhi/boishakhitv-org.stream/playlist.m3u8',
            'category_id' => '1',
        ]);
        Tv::create([
            'id' => '5',
            'title' => 'BTV Chattagram',
            'link' => 'https://tempx.jagobd.com:441/c5V6mmMyX7RpbEU9Mi8xNy8yMDEOGIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PT0mdFsaWRtaW51aiPhnPTI/btvnational-ctg.stream/chunks.m3u8',
            'category_id' => '1',
        ]);
        Tv::create([
            'id' => '6',
            'title' => 'ETV',
            'link' => 'http://210.4.72.204/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8',
            'category_id' => '1',
        ]);
        Tv::create([
            'id' => '7',
            'title' => 'Rishtey Cineplex',
            'link' => 'https://viacom-b.multitvsolution.com/viacomhls/rishteycineplex.m3u8',
            'category_id' => '2',
        ]);
    }
}
