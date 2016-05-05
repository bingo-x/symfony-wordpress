<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends Controller
{
    /*
     * 登录界面
     */
    public function loginAction()
    {
        return $this->render('AdminBundle:User:login.html.twig');
    }
}
