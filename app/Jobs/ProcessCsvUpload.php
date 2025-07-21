<?php

namespace App\Jobs;

use App\Models\CsvUser;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessCsvUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $path;

    public function __construct($path)
    {
        $this->path = $path;
    }

    public function handle()
    {
        $file = storage_path('app/private/' . $this->path);

        if (!file_exists($file)) {
            Log::info('File path:', ['path' => $file]); 
            return;
        }

        $rows = array_filter(array_map('str_getcsv', file($file)));
        $header = array_map(fn($h) => strtolower(trim($h)), array_shift($rows));

        Log::info('Header:', ['header' => $header]);


        $map = [
            'firstname' => array_search('firstname', $header),
            'lastname' => array_search('lastname', $header),
            'mobile' => array_search('mobile', $header),
            'email' => array_search('email', $header),
        ];

        $chunkSize = 500;

        foreach (array_chunk($rows, $chunkSize) as $chunk) {
            $insertData = [];

            foreach ($chunk as $row) {
                if (
                    isset($row[$map['email']]) &&
                    isset($row[$map['firstname']]) &&
                    isset($row[$map['lastname']]) &&
                    isset($row[$map['mobile']])
                ) {
                    $insertData[] = [
                        'email' => trim($row[$map['email']]),
                        'first_name' => trim($row[$map['firstname']]),
                        'last_name' => trim($row[$map['lastname']]),
                        'mobile' => trim($row[$map['mobile']]),
                        'token' => (string) Str::uuid(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            CsvUser::upsert($insertData, ['email']);
        }

        Log::info('CSV batch upload completed: ' . $this->path);
    }
}
