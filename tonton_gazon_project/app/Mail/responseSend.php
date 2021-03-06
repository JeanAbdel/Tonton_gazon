<?php

namespace App\Mail;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class responseSend extends Mailable
{
    use Queueable, SerializesModels;

    public $type;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param User $to
     * @param $type
     */
    public function __construct(User $to,$type)
    {
        $this->user = $to;
        $this->type = $type;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.sendResponse');
    }
}
