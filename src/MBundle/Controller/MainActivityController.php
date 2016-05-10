<?php

namespace MBundle\Controller;

use MBundle\Controller\BaseController;

class MainActivityController extends BaseController
{
    public function indexAction()
    {
        return $this->render('MBundle:MainActivity:index.html.twig');
    }
}
