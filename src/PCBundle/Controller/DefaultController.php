<?php

namespace PCBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return new Response('Hello world!');
        return $this->render('PCBundle:Default:index.html.twig');
    }
}
