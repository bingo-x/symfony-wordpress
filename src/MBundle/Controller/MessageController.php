<?php

namespace MBundle\Controller;

use MBundle\Controller\BaseController;

class MessageController extends BaseController
{
    public function indexAction()
    {
        return $this->render('MBundle:Message:index.html.twig');
    }
}
