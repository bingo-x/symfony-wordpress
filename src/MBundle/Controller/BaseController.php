<?php

namespace MBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\Session;

class BaseController extends Controller {

    protected $loginid;
    protected $nickname;
    protected $session;

    public function __construct() {
        $this->getLoginInfo();
    }

    private function getLoginInfo() {
        $this->session = new Session();
        $this->loginid = intval($this->session->get("loginid", 0));
        $this->nickname = $this->session->get("nickname", null);
    }
}

?>